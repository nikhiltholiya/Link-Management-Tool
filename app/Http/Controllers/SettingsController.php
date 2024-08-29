<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateEmailRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\SmtpSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\SettingService;

class SettingsController extends Controller
{
    protected SettingService $settingService;

    public function __construct()
    {
        $this->settingService = new SettingService();
    }


    public function index()
    {
        return Inertia::render('Settings');
    }


    //--------------------------------------------------------
    // basic updating of user profile
    function profile(UpdateProfileRequest $request)
    {
        $this->settingService->updateProfile($request->validated());

        return back()->with('success', 'Profile Successfully Updated.');
    }
    //--------------------------------------------------------


    public function changeEmail(UpdateEmailRequest $request, SmtpSetting $smtp)
    {
        $this->settingService->changeEmail($request->validated());

        return back()->with('success', 'We have sent a email verification link to your new email account.');
    }


    public function saveEmail(Request $request)
    {
        $saved = $this->settingService->saveChangedEmail($request->token);

        if (!$saved) {
            return redirect()->route('settings.index')
                ->with('error', "Verification token didn't match or expire.");
        }

        return redirect()->route('settings.index')
            ->with('success', "New email successfully changed.");
    }
}
