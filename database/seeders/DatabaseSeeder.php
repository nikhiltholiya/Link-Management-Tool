<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(AppSettingsSeeder::class);
        $this->call(SmtpSettingsSeeder::class);
        $this->call(SocialLoginSeeder::class);
        $this->call(PaymentGatewaySeeder::class);
        $this->call(IntroSectionSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(LanguagesSeeder::class);
        $this->call(SocialLinksSeeder::class);
        $this->call(ThemeSeeder::class);
        $this->call(TestimonialSeeder::class);
        $this->call(PlanSeeder::class);
        $this->call(UserSeeder::class);
    }
}
