<?php

namespace App\Services;

use App\Models\PaymentGateway;
use App\Models\PricingPlan;
use App\Models\Subscription;
use Illuminate\Support\Facades\DB;

class SubscriptionService
{
   public function billingInfo(string|int $id)
   {
      $plan  = PricingPlan::find($id);
      $methods = PaymentGateway::where('active', 1)->get();

      return ['plan' => $plan, 'methods' => $methods];
   }


   public function getSubscriptions(array $data)
   {
      return DB::transaction(function () use ($data) {
         $page = array_key_exists('per_page', $data) ? intval($data['per_page']) : 10;

         return Subscription::when(array_key_exists('search', $data), function ($query) use ($data) {
            // return $query->where('link_name', 'LIKE', '%' . $data['search'] . '%');
            return $query->where('method', 'LIKE', '%' . $data['search'] . '%')
               ->orWhere('billing', 'LIKE', '%' . $data['search'] . '%')
               ->orWhere('total_price', 'LIKE', '%' . $data['search'] . '%');
         })
            ->orderBy('created_at', 'desc')
            ->paginate($page);
      }, 5);
   }


   public function update(int|string $id, array $data)
   {
      DB::transaction(function () use ($data, $id) {
      }, 5);
   }
}
