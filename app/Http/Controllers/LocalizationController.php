<?php

namespace App\Http\Controllers;

use Exception;
use App\Helpers\AppHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class LocalizationController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Translation/Show');
    }


    public function create(Request $request)
    {
        $langPath = base_path('lang');
        $langDir = "$langPath/$request->local";
        $appLangPath = storage_path('app/lang');

        if (is_dir($langDir)) {
            throw new Exception("Language already exist");
        }

        File::makeDirectory($langDir, 0777, true, true);
        File::copyDirectory($appLangPath, $langDir);

        return back()->with('success', "New language added");
    }


    public function edit($local)
    {
        $appTrans = File::getRequire(base_path("lang/$local/app.php"));
        $inputTrans = File::getRequire(base_path("lang/$local/input.php"));

        return Inertia::render('Admin/Translation/Update', compact('appTrans', 'inputTrans', 'local'));
    }


    public function update(Request $request, $local, $file)
    {
        $langFilePath = base_path("lang/$local/$file.php");
        $fileContent = File::getRequire($langFilePath);

        foreach ($request->all() as $key => $value) {
            $fileContent[$key] = $value;
        }

        // Save the updated content back to the file
        $updatedContent = AppHelper::getFileArray($fileContent);
        File::put($langFilePath, $updatedContent);

        return back()->with('success', 'App translation successfully updated');
    }


    public function localStatus(Request $request, $local)
    {
        $langFilePath = base_path("lang/$local/active.txt");
        if (is_file($langFilePath)) {
            unlink($langFilePath);
        } else {
            file_put_contents($langFilePath, true);
        }

        return back();
    }


    public function languageChange(string $locale)
    {
        $cookie = Cookie::forever('locale', $locale);

        return back()->withCookie($cookie);
    }
}
