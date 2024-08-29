<?php

namespace App\Http\Controllers;

use App\Models\SmtpSetting;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class EmailController extends Controller
{
     
    function SendVerifyEmail (EmailVerificationRequest $request) {
        $smtp = SmtpSetting::first();

        config(['mail.mailers.smtp.host' => $smtp->host]);
        config(['mail.mailers.smtp.port' => $smtp->port]);
        config(['mail.mailers.smtp.username' => $smtp->username]);
        config(['mail.mailers.smtp.password' => $smtp->password]);
        config(['mail.mailers.smtp.encryption' => $smtp->encryption]);
        config(['mail.from.address' => $smtp->sender_email]);
        config(['mail.from.name' => $smtp->sender_name]);

        $request->fulfill();
        return redirect('/dashboard');
    }
    
    function ReSendVerifyEmail (Request $request) {
        $smtp = SmtpSetting::first();

        config(['mail.mailers.smtp.host' => $smtp->host]);
        config(['mail.mailers.smtp.port' => $smtp->port]);
        config(['mail.mailers.smtp.username' => $smtp->username]);
        config(['mail.mailers.smtp.password' => $smtp->password]);
        config(['mail.mailers.smtp.encryption' => $smtp->encryption]);
        config(['mail.from.address' => $smtp->sender_email]);
        config(['mail.from.name' => $smtp->sender_name]);

        $request->user()->sendEmailVerificationNotification();
     
        return back()->with('message', 'Verification link sent!');
    }

    function VerifyEmail () {
        return view('auth.verify');
    }
}
