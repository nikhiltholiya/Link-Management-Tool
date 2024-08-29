<?php

namespace App\Providers;

use App\Models\SmtpSetting;
use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;

class SMTPServiceProvider extends ServiceProvider implements DeferrableProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(SmtpSetting::class, function () {
            $smtp = SmtpSetting::first();

            config(['mail.mailers.smtp.host' => $smtp->host]);
            config(['mail.mailers.smtp.port' => (int) $smtp->port]);
            config(['mail.mailers.smtp.username' => $smtp->username]);
            config(['mail.mailers.smtp.password' => $smtp->password]);
            config(['mail.mailers.smtp.encryption' => $smtp->encryption]);
            config(['mail.from.address' => $smtp->sender_email]);
            config(['mail.from.name' => $smtp->sender_name]);

            return $smtp;
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array<int, string>
     */
    public function provides(): array
    {
        return [SmtpSetting::class];
    }
}
