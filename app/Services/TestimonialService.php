<?php

namespace App\Services;

use App\Models\Testimonial;
use Illuminate\Support\Facades\DB;

class TestimonialService extends MediaService
{
   public function getTestimonials()
   {
      $testimonials = Testimonial::all();

      $testimonials->each(function ($item) {
         if ($item->hasMedia('testimonial')) {
            $item->thumbnail = $item->getFirstMediaUrl('testimonial');
         } else {
            $item->thumbnail = url('') . '/' . $item->thumbnail;
         }
      });

      return $testimonials;
   }


   public function createTestimonial(array $data)
   {
      DB::transaction(function () use ($data) {
         $testimonial = Testimonial::create([
            'name' => $data['name'],
            'title' => $data['title'],
            'testimonial' => $data['testimonial'],
            'thumbnail' => 'null'
         ]);

         $this->addSingleFile($testimonial, $data['thumbnail'], 'testimonial');
      }, 5);
   }


   public function updateTestimonial(int|string $id, array $data)
   {
      DB::transaction(function () use ($data, $id) {
         $testimonial = Testimonial::find($id);
         $testimonial->update([
            'name' => $data['name'],
            'title' => $data['title'],
            'testimonial' => $data['testimonial'],
         ]);

         if ($data['thumbnail']) {
            $this->addSingleFile($testimonial, $data['thumbnail'], 'testimonial');
         };
      }, 5);
   }
}
