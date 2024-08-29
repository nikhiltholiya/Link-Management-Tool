<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use App\Models\User;
use App\Models\SocialLogin;
use App\Models\PricingPlan;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function key_config()
    {
        $google = SocialLogin::where('name', 'google')->first();

        config(['services.google.client_id' => $google->client_id]);
        config(['services.google.client_secret' => $google->client_secret]);
        config(['services.google.redirect' => $google->redirect_url]);
    }

    // Google login
    function google()
    {
        $this->key_config();
        return Socialite::driver('google')->redirect();
    }

    function google_callback()
    {
        try {
            $this->key_config();
            $user = Socialite::driver('google')->user();
            $registered = User::where('google_id', $user->id)->first();
            $plan = PricingPlan::where('name', 'BASIC')->first();

            if ($registered) {
                Auth::login($registered, true);
            } else {
                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => Hash::make('googleauth'),
                ])->assignRole('BASIC');
                $newUser->google_id = $user->id;
                $newUser->email_verified_at = now();
                $newUser->pricing_plan_id = $plan->id;
                $newUser->save();

                event(new Registered($newUser));
                Auth::login($newUser, true);
            }

            return redirect(RouteServiceProvider::HOME);
        } catch (\Throwable $th) {
            // throw $th
            return redirect()->to('/login');
        }
    }
}
