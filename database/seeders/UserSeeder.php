<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = array(
            "name" => session('admin_name') ?? "Admin",
            "email" => session('admin_email') ?? "superadmin@gmail.com",
            'email_verified_at' => now(),
            "password" => Hash::make(session('admin_password') ?? "superadmin"),
        );

        User::create($user)->assignRole('SUPER-ADMIN');
    }
}
