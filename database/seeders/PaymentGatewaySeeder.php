<?php

namespace Database\Seeders;

use App\Models\PaymentGateway;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentGatewaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $payment_methods = [
            [
                'active' => false,
                'name' => 'stripe',
                'key' => '',
                'secret' => '',
            ],
            [
                'active' => false,
                'name' => 'razorpay',
                'key' => '',
                'secret' => '',
            ],
            [
                'active' => false,
                'name' => 'paypal',
                'key' => '',
                'secret' => '',
            ],
            [
                'active' => false,
                'name' => 'mollie',
                'key' => '',
                'secret' => null,
            ],
            [
                'active' => false,
                'name' => 'paystack',
                'key' => '',
                'secret' => '',
            ]
        ];

        foreach ($payment_methods as $method) {
            PaymentGateway::create([
                'active' => $method['active'],
                'name' => $method['name'],
                'key' => $method['key'],
                'secret' => $method['secret'],
            ]);
        }
    }
}
