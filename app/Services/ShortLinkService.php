<?php

namespace App\Services;

use App\Models\Link;
use Illuminate\Support\Facades\DB;

class ShortLinkService extends LinkService
{
   public function create(array $data)
   {
      DB::transaction(function () use ($data) {
         $short_link = "";
         if ($data['link_slug']) {
            $short_link = $data['link_slug'];
         } else {
            $link_key = rand(10000000, 90000000);
            $short_link = base_convert($link_key, 10, 36);
         }

         $shortLink = array_unique(array_merge([
            'user_id' => auth()->user()->id,
            'url_name' => $short_link,
            'link_type' => 'shortlink',
         ], $data));

         Link::create($shortLink);
      }, 5);
   }


   public function update(int|string $id, array $data)
   {
      DB::transaction(function () use ($data, $id) {
         Link::find($id)->update($data);
      }, 5);
   }
}
