<?php

namespace App\Services;

use App\Models\PaymentGateway;
use Illuminate\Support\Facades\DB;

class PaymentSettingsService
{
   public function getPaymentMethods(): array
   {
      $stripe = PaymentGateway::where('name', 'stripe')->first();
      $razorpay = PaymentGateway::where('name', 'razorpay')->first();
      $paypal = PaymentGateway::where('name', 'paypal')->first();
      $mollie = PaymentGateway::where('name', 'mollie')->first();
      $paystack = PaymentGateway::where('name', 'paystack')->first();

      return [
         'stripe' => $stripe,
         'razorpay' => $razorpay,
         'paypal' => $paypal,
         'mollie' => $mollie,
         'paystack' => $paystack,
      ];
   }


   public function create(array $data)
   {
      DB::transaction(function () use ($data) {
      }, 5);
   }


   public function updatePaymentMethod(int|string $id, array $data)
   {
      DB::transaction(function () use ($id, $data) {
         PaymentGateway::find($id)->update($data);
      }, 5);
   }
}
