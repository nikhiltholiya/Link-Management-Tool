<?php

namespace Database\Seeders;

use App\Models\SmtpSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SmtpSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = array(
            "host" => session('mail_host') ?? "sandbox.smtp.mailtrap.io",
            "port" => session('mail_port') ?? "2525",
            "username" => session('mail_username') ?? "02cb9676dda204",
            "password" => session('mail_password') ?? "e1df52c9eb9985",
            "encryption" => session('mail_encryption') ?? "tls",
            "sender_email" => session('mail_from_address') ?? "linkdrop@gmail.com",
            "sender_name" => session('mail_from_name') ?? "linkdrop",
        );

        SmtpSetting::create($data);
    }
}
