<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Storage;

class InstallerController extends Controller
{
    // redirecting to setup route
    public function backToSetup()
    {
        return redirect('/setup');
    }


    public function checkServer()
    {
        return view('installer.check');
    }


    public function viewStep1()
    {
        $data = array(
            "APP_NAME" => session('env.APP_NAME') ? str_replace('"', '', session('env.APP_NAME')) : str_replace('"', '', config('app.name')),
            "APP_ENV" => session('env.APP_ENV') ? session('env.APP_ENV') : config('app.env'),
            "APP_DEBUG" => session('env.APP_DEBUG') ? session('env.APP_DEBUG') : config('app.debug'),
            "APP_KEY" => session('env.APP_KEY') ? session('env.APP_KEY') : config('app.key'),
        );

        return view('installer.step1', compact('data'));
    }


    public function setupStep1(Request $request)
    {
        $request->session()->put('env.APP_ENV', $request->app_env);
        $request->session()->put('env.APP_DEBUG', $request->app_debug);

        if (strlen($request->app_name) > 0) {
            $request->session()->put('env.APP_NAME', '"' . $request->app_name . '"');
        }

        if (strlen($request->app_key) > 0) {
            $request->session()->put('env.APP_KEY', $request->app_key);
        }

        return redirect()->route('view.step2');
    }


    public function viewStep2()
    {
        if (config("database.default") == 'mysql') {
            $db = config('database.connections.mysql');
        }

        $data = array(
            "DB_CONNECTION" => session('env.DB_CONNECTION') ?? config("database.default"),
            "DB_HOST" => session('env.DB_HOST') ?? (isset($db['host']) ? $db['host'] : ''),
            "DB_PORT" => session('env.DB_PORT') ?? (isset($db['port']) ? $db['port'] : ''),
            "DB_DATABASE" => session('env.DB_DATABASE') ?? (isset($db['database']) ? $db['database'] : ''),
            "DB_USERNAME" => session('env.DB_USERNAME') ?? (isset($db['username']) ? $db['username'] : ''),
            "DB_PASSWORD" => session('env.DB_PASSWORD') ? str_replace('"', '', session('env.DB_PASSWORD')) : (isset($db['password']) ? str_replace('"', '', $db['password']) : ''),
        );

        return view('installer.step2', ["data" => $data]);
    }


    public function setupStep2(Request $request)
    {
        if (strlen($request->db_password) > 0) {
            $request->session()->put('env.DB_PASSWORD', '"' . $request->db_password . '"');
        }
        $request->session()->put('env.DB_CONNECTION', $request->db_connection);
        $request->session()->put('env.DB_HOST', $request->db_host);
        $request->session()->put('env.DB_PORT', $request->db_port);
        $request->session()->put('env.DB_DATABASE', $request->db_database);
        $request->session()->put('env.DB_USERNAME', $request->db_username);

        return redirect()->route('view.step3');
    }


    public function viewStep3()
    {
        $data = array(
            "name" => session('admin_name') ?? "",
            "email" => session('admin_email') ?? "",
            "password" => session('admin_password') ?? "",
        );

        return view('installer.step3', ["data" => $data]);
    }


    public function setupStep3(Request $request)
    {
        try {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255'],
                'password' => ['required', Rules\Password::defaults()],
            ]);

            session()->put('admin_name', $request->name);
            session()->put('admin_email', $request->email);
            session()->put('admin_password', $request->password);
            session()->put('admin_setup', true);

            return back()->with('success', 'Admin info successfully saved');
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }
    }


    public function installView()
    {
        if (!session('admin_setup')) {
            return redirect()->route('view.step3');
        }
        if (!session('db_connection')) {
            return redirect()->route('view.step3');
        }

        return view('installer.last-step');
    }


    public function installVersion()
    {
        ini_set('max_execution_time', 600);

        try {
            $this->changeEnv([
                'APP_NAME' => session('env.APP_NAME'),
                'APP_ENV' => session('env.APP_ENV'),
                'APP_KEY' => session('env.APP_KEY'),
                'APP_DEBUG' => session('env.APP_DEBUG'),
                'APP_URL' => session('env.APP_URL'),
                'LOG_CHANNEL' => session('env.LOG_CHANNEL'),

                'DB_CONNECTION' => session('env.DB_CONNECTION'),
                'DB_HOST' => session('env.DB_HOST'),
                'DB_PORT' => session('env.DB_PORT'),
                'DB_DATABASE' => session('env.DB_DATABASE'),
                'DB_USERNAME' => session('env.DB_USERNAME'),
                'DB_PASSWORD' => session('env.DB_PASSWORD'),
            ]);

            Artisan::call('down'); // Maintenance mode ON
            Artisan::call('migrate:fresh --force --seed');
            Artisan::call('up');

            Storage::disk('public')->put('installed', 'Contents');
            session()->forget('db_connection');
            session()->forget('verify_purchase');
            Artisan::call('optimize:clear');

            return view('installer.finished');
        } catch (\Exception $e) {
            Artisan::call('up'); // Maintenance mode OFF
            Artisan::call('optimize:clear'); // Clear cache after failed update
            return back()->with('error', $e->getMessage());
        }
    }


    public function changeEnv($data = array())
    {
        if (count($data) > 0) {

            // Read .env-file
            $env = file_get_contents(base_path() . '/.env');

            // Split string on every " " and write into array
            $env = preg_split('/(\r\n|\n|\r)/', $env);

            // Loop through given data
            foreach ((array) $data as $key => $value) {

                // Loop through .env-data
                foreach ($env as $env_key => $env_value) {

                    // Turn the value into an array and stop after the first split
                    $entry = explode("=", $env_value, 2);

                    // Check, if new key fits the actual .env-key
                    if ($entry[0] == $key) {
                        // If yes, overwrite it with the new one
                        if ($value !== null) {

                            $env[$env_key] = $key . "=" . $value;
                        }
                    } else {
                        // If not, keep the old one
                        $env[$env_key] = $env_value;
                    }
                }
            }

            // Turn the array back to an String
            $env = implode("\n", $env);

            // And overwrite the .env with the new data
            file_put_contents(base_path() . '/.env', $env);

            return true;
        } else {
            return false;
        }
    }


    public function generateAppKey()
    {
        Artisan::call('key:generate', ['--show' => true]);
        $output = (Artisan::output());
        $output = substr($output, 0, -2);

        return $output;
    }
}
