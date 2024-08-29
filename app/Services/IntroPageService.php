<?php

namespace App\Services;

use App\Models\AppSection;
use App\Models\CustomPage;
use App\Models\PricingPlan;
use App\Models\Testimonial;
use Illuminate\Support\Facades\DB;

class IntroPageService extends MediaService
{
   public function getIntroInfo(): array
   {
      $customPages = CustomPage::all();
      $testimonials = Testimonial::all();
      $plans = PricingPlan::where('status', 'active')->get();

      $appSections = AppSection::all()->each(function ($item) {
         if ($item->hasMedia()) {
            $item->thumbnail = $item->getFirstMediaUrl();
         } else {
            $item->thumbnail = url('') . '/' . $item->thumbnail;
         }
      });

      return [
         'plans' => $plans,
         'appSections' => $appSections,
         'customPages' => $customPages,
         'testimonials' => $testimonials,
      ];
   }


   public function updateAppSection(int|string $id, array $data)
   {
      DB::transaction(function () use ($id, $data) {
         $section = AppSection::find($id);

         $section->update([
            'title' => $data['title'],
            'description' => array_key_exists('description', $data) ? $data['description'] : null,
         ]);

         if (array_key_exists('thumbnail', $data)) {
            $this->addSingleFile($section, $data['thumbnail']);
         };
      }, 5);
   }


   public function updateSectionList(int|string $id, array $data)
   {
      DB::transaction(function () use ($id, $data) {
         $allList = [];
         $oneList = ['content' => '', 'icon' => '', 'url' => ''];

         for ($i = 1; $i <= count($data) - 2; $i++) {
            foreach ($data as $key => $value) {
               if ($key != '_token' && $key != '_method') {
                  $str = substr($key, -1);
                  $newKey = substr($key, 0, -1);
                  $number =  (int) $str;

                  if ($i == $number) {
                     $oneList[$newKey] = $value;
                  }
               }
            }

            if ($oneList['content'] == '' && $oneList['icon'] == '' && $oneList['url'] == '') {
               break;
            } else {
               array_push($allList, $oneList);
               $oneList = ['content' => '', 'icon' => '', 'url' => ''];
            }
         }

         AppSection::where('id', $id)->update([
            'section_list' => json_encode($allList)
         ]);
      }, 5);
   }
}
