<?php

namespace App\Services;

use App\Models\Link;
use App\Models\Theme;
use Illuminate\Support\Facades\DB;

class BioLinkService extends LinkService
{
   public function create(array $data)
   {
      DB::transaction(function () use ($data) {
         $theme = Theme::get()->first();
         $trimUrl = trim(str_replace(" ", "", $data['url_name']));
         $urlName = preg_replace("/\s+/", "", strtolower($trimUrl));

         $link = new Link;
         $link->user_id = auth()->user()->id;
         $link->link_name = $data['link_name'];
         $link->url_name = $urlName;
         $link->theme_id = $theme->id;
         $link->save();
      }, 5);
   }


   public function update(int|string $id, array $data)
   {
      DB::transaction(function () use ($data, $id) {
         $link = Link::find($id);
         $link->link_name = $data['link_name'];
         $link->url_name = array_key_exists('new_url', $data) ? $data['url_name'] : $link->url_name;
         $link->save();
      }, 5);
   }
}
