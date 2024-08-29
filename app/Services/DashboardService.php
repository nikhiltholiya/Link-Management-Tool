<?php

namespace App\Services;

use App\Models\QRCode;
use App\Models\Link;
use App\Models\Project;
use App\Models\ShetabitVisit;

class DashboardService
{
   protected $weeklyPageView = [0, 0, 0, 0, 0, 0, 0];

   protected $monthlyVisitors = [
      "Jan" => 0,
      "Feb" => 0,
      "Mar" => 0,
      "Apr" => 0,
      "May" => 0,
      "Jun" => 0,
      "Jul" => 0,
      "Aug" => 0,
      "Sep" => 0,
      "Oct" => 0,
      "Nov" => 0,
      "Dec" => 0
   ];


   public function getDashboardsInfo(): array
   {
      $user = app('user');
      $SA = $user->hasRole('SUPER-ADMIN');

      $links = Link::when(!$SA, function ($query) use ($user) {
         return $query->where('user_id', $user->id);
      })->get()->count();

      $qrcodes = QRCode::when(!$SA, function ($query) use ($user) {
         return $query->where('user_id', $user->id);
      })->get()->count();

      $projects = Project::when(!$SA, function ($query) use ($user) {
         return $query->where('user_id', $user->id);
      })->get()->count();

      $analytics = ShetabitVisit::when(!$SA, function ($query) use ($user) {
         return $query->where('visitor_id', $user->id);
      })->get();

      return [
         'links' => $links,
         'qrcodes' => $qrcodes,
         'projects' => $projects,
         'analytics' => $analytics
      ];
   }


   public function monthlyVisitors($analytics)
   {
      // Counting the total page visitor of 12 months
      $counter = [];
      foreach ($analytics as $item) {
         $month = $item->created_at->format('M');
         $year = $item->created_at->format('Y');
         if ($year == date("Y")) {
            array_push($counter, $month);
         }
      };

      $values = [];
      $result = array_count_values($counter);

      foreach ($result as $key => $value) {
         foreach ($this->monthlyVisitors as $k => $v) {
            if ($k == $key) {
               $this->monthlyVisitors[$k] = $value;
            }
         }
      }
      foreach ($this->monthlyVisitors as $key => $value) {
         array_push($values, $value);
      }

      return $values;
   }


   public function weeklyPageView($analytics)
   {
      // Counting the weekly page view
      foreach ($analytics as $item) {
         $day = $item->created_at->format('d');
         $year = $item->created_at->format('Y');
         $month = $item->created_at->format('m');

         if ($year == date("Y") && $month == date("m")) {
            for ($i = 6, $j = 0; $i >= 0; $i--, $j++) {
               $d = strtotime("-{$i} Days");
               $countDay = date("d", $d);
               if ($countDay == $day) {
                  $this->weeklyPageView[$j]++;
               }
            }
         }
      };

      return $this->weeklyPageView;
   }
}
