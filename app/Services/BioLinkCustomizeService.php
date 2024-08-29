<?php

namespace App\Services;

use App\Models\Link;
use App\Models\LinkItem;
use App\Models\SocialLinks;
use App\Models\Theme;
use Illuminate\Support\Facades\DB;

class BioLinkCustomizeService extends MediaService
{
   protected LinkService $linkService;

   function __construct()
   {
      $this->linkService = new LinkService();
   }

   public function showLink(string|int $id)
   {
      $themes = Theme::all();
      $socialLinks = SocialLinks::all();
      $itemLastPosition = LinkItem::where('link_id', $id)->max('item_position');
      $link = $this->linkService->getLinkById($id);

      return [
         'link' => $link,
         'themes' => $themes,
         'socialLinks' => $socialLinks,
         'itemLastPosition' => $itemLastPosition
      ];
   }

   public function themeChange(int|string $linkId, int $themeId)
   {
      DB::transaction(function () use ($linkId, $themeId) {
         $link = Link::find($linkId);

         if ($link->custom_theme_active) {
            $link->custom_theme_active = FALSE;
         }

         $link->theme_id = $themeId;
         $link->save();
      }, 5);
   }

   public function social(int|string $id, array $data)
   {
      DB::transaction(function () use ($id, $data) {
         $link = Link::find($id);
         $link->socials = $data['socials'];
         $link->social_color = $data['social_color'];
         $link->save();
      }, 5);
   }

   public function profile(int|string $id, array $data)
   {
      DB::transaction(function () use ($id, $data) {
         $link = Link::find($id);
         $link->link_name = $data['link_name'];
         $link->short_bio = $data['short_bio'];
         $link->save();

         if ($data['thumbnail']) {
            $this->addNewDeletePrev($link, $data['thumbnail'], 'thumbnail');
         }
      }, 5);
   }

   public function logoUpdate(int|string $id, array $data)
   {
      DB::transaction(function () use ($id, $data) {
         $link = Link::find($id);

         $this->addNewDeletePrev($link, $data['branding'], 'branding');
      }, 5);
   }
}
