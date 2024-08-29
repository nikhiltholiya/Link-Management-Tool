<?php

namespace App\Services;

use App\Models\PricingPlan;
use Illuminate\Support\Facades\DB;

class PricingPlanService
{
   public function getPricingPlan(string|int $id)
   {
      return PricingPlan::find($id);
   }


   public function getPricingPlans(bool $idAdmin)
   {
      $plans = PricingPlan::when(!$idAdmin, function ($query) {
         return $query->where('status', 'active');
      })->get();

      return $plans;
   }


   public function createPricingPlan(array $data)
   {
      DB::transaction(function () use ($data) {
         PricingPlan::create($data);
      }, 5);
   }


   public function updatePricingPlan(string|int $id, array $data)
   {
      DB::transaction(function () use ($id, $data) {
         PricingPlan::find($id)->update($data);
      }, 5);
   }
}
