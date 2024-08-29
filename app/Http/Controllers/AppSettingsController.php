<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAppInfoRequest;
use App\Http\Requests\UpdateGoogleAuthRequest;
use App\Http\Requests\UpdateSMTPRequest;
use App\Models\SmtpSetting;
use App\Models\SocialLogin;
use App\Services\AppSettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class AppSettingsController extends Controller
{
    private AppSettingsService $settingsService;

    public function __construct()
    {
        $this->settingsService = new AppSettingsService();
    }


    // Getting app info
    public function index(Request $req)
    {
        $smtp = SmtpSetting::first();
        $google = SocialLogin::where('name', 'google')->first();

        return Inertia::render('Admin/AppSettings', compact('smtp', 'google'));
    }


    // Global settings for admin
    public function appUpdate(UpdateAppInfoRequest $request)
    {
        $this->settingsService->updateAppInfo($request->validated());

        return back()->with('success', 'Global settings successfully updated.');
    }


    // Auth settings for admin
    public function authGoogle(UpdateGoogleAuthRequest $request)
    {
        $this->settingsService->updateSocialLogin('google', $request->validated());

        return back()->with('success', 'Google auth successfully updated.');
    }


    // SMTP settings for admin
    public function smtpUpdate(UpdateSMTPRequest $request)
    {
        config(['mail.mailers.smtp.host' => $request->host]);
        config(['mail.mailers.smtp.port' => (int) $request->port]);
        config(['mail.mailers.smtp.username' => $request->username]);
        config(['mail.mailers.smtp.password' => $request->password]);
        config(['mail.mailers.smtp.encryption' => $request->encryption]);
        config(['mail.from.address' => $request->from_address]);
        config(['mail.from.name' => $request->from_name]);

        Mail::raw('This is a test email.', function ($message) use ($request) {
            $message->to($request->admin_email, 'Recipient Name');
            $message->subject('Test Email');
            $message->from($request->from_address, 'Test');
        });

        $this->settingsService->updateSMTP($request->validated());

        return back()->with('success', 'SMTP connection is successfully established');
    }


    public function appControl()
    {
        $version = File::get(base_path() . '/version.txt');
        $path = storage_path('app/backup-main');
        $files = array_diff(scandir($path), array('..', '.'));

        return Inertia::render('Admin/AppControl', compact('version', 'files'));
    }
}
