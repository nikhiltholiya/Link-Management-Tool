<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            $app = app('setting');

            return (new MailMessage)->view('mail.email-verification', [
                'url' => $url, 'app' => $app, 'user' => $notifiable,
            ]);
        });


        ResetPassword::toMailUsing(function (object $notifiable, string $token) {
            $app = app('setting');
            // Get the user's email address
            $email = $notifiable->getEmailForPasswordReset();

            // Build the password reset URL using the $token
            $resetUrl = url('reset-password', $token) . "?email=$email";

            return (new MailMessage)->view('mail.reset-password', [
                'url' => $resetUrl, 'app' => $app, 'user' => $notifiable,
            ]);
        });
    }
}
