<?php

namespace Database\Seeders;

use App\Models\PricingPlan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PricingPlan::create([
            'name' => 'BASIC',
            'description' => 'Free plan for basic use',
            'monthly_price' => 0,
            'yearly_price' => 0,
            'currency' => 'USD',
            'status' => "active",
            'biolinks' => '10',
            'biolink_blocks' => 4,
            'shortlinks' => '10',
            'projects' => '10',
            'qrcodes' => '10',
            'themes' => 'Free',
            'custom_theme' => false,
            'support' => 72,
        ]);
        PricingPlan::create([
            'name' => 'STANDARD',
            'description' => 'Standard plan for standard use',
            'monthly_price' => 10,
            'yearly_price' => 100,
            'currency' => 'USD',
            'status' => "active",
            'biolinks' => '100',
            'biolink_blocks' => 7,
            'shortlinks' => '100',
            'projects' => '100',
            'qrcodes' => '150',
            'themes' => 'Standard',
            'custom_theme' => true,
            'support' => 48,
        ]);
        PricingPlan::create([
            'name' => 'PREMIUM',
            'description' => 'Premium plan for business use',
            'monthly_price' => 25,
            'yearly_price' => 280,
            'currency' => 'USD',
            'status' => "active",
            'biolinks' => 'Unlimited',
            'biolink_blocks' => 9,
            'shortlinks' => 'Unlimited',
            'projects' => 'Unlimited',
            'qrcodes' => 'Unlimited',
            'themes' => 'Premium',
            'custom_theme' => true,
            'support' => 24,
        ]);
    }
}
