<?php

namespace Database\Seeders;

use App\Models\AppSetting;
use Illuminate\Database\Seeder;

class AppSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AppSetting::create([
            'title' => 'LinkDrop',
            'logo' => 'assets/icons/link-drop.png',
            'copyright' => 'Copyrights © 2023 LinkDrop. All rights reserved.',
            'description' => 'An effective business description should include information that tells readers exactly what your company does, who is in charge of operations, and what will make your company successful.',
        ]);
    }
}
