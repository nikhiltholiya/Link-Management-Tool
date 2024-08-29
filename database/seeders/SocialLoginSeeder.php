<?php

namespace Database\Seeders;

use App\Models\SocialLogin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SocialLoginSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SocialLogin::create([
            'active' => false,
            'name' => 'google',
            'client_id' => '',
            'client_secret' => '',
            'redirect_url' => '',
        ]);
    }
}
