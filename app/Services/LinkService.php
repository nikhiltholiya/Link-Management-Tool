<?php

namespace App\Services;

use App\Helpers\Utils;
use App\Models\Link;
use App\Models\CustomTheme;
use App\Models\LinkItem;
use App\Models\QRCode;
use App\Models\ShetabitVisit;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class LinkService extends MediaService
{
   public function getLinkById(string|int $id): Link|null
   {
      $user = app('user');
      $SA = $user->hasRole('SUPER-ADMIN');

      $link = Link::when(!$SA, function ($query) use ($user) {
         return $query->where('user_id', $user->id);
      })
         ->where('id', $id)
         ->with(['theme', 'custom_theme', 'items'])
         ->first();

      if ($link) {
         $link->thumbnail = $this->getMediaByName($link, 'thumbnail');
         $link->branding = $this->getMediaByName($link, 'branding');

         $link->items->each(function ($item) {
            if ($item->hasMedia()) {
               $item->content = $item->getFirstMediaUrl();
            }
         });
      }

      return $link;
   }


   public function getLinkByUrl(string $urlName): Link|null
   {
      $link = Link::where('url_name', $urlName)
         ->with(['theme', 'custom_theme', 'items'])
         ->first();

      if ($link) {
         $link->thumbnail = $this->getMediaByName($link, 'thumbnail');
         $link->branding = $this->getMediaByName($link, 'branding');

         $link->items->each(function ($item) {
            if ($item->hasMedia()) {
               $item->content = $item->getFirstMediaUrl();
            }
         });
      }

      return $link;
   }


   public function getLinksByType(array $data, string $linkType): LengthAwarePaginator
   {
      $user = app('user');
      $SA = $user->hasRole('SUPER-ADMIN');
      $page = array_key_exists('per_page', $data) ? intval($data['per_page']) : 10;

      $links = Link::when(!$SA, function ($query) use ($user) {
         return $query->where('user_id', $user->id);
      })
         ->when(array_key_exists('search', $data), function ($query) use ($data) {
            return $query->where('link_name', 'LIKE', '%' . $data['search'] . '%');
         })
         ->where('link_type', $linkType)
         ->orderBy('created_at', 'desc')
         ->with('qrcode')
         ->with('visited')
         ->paginate($page);

      return $links;
   }


   public function exportLinksByType(string $linkType)
   {
      $biolinks = Link::where('link_type', $linkType)->get();
      $columns = Schema::getColumnListing((new Link())->getTable());
      $headers = Utils::exportToCSV($biolinks, $columns, 'biolinks');

      return $headers;
   }


   public function deleteLink(int|string $id)
   {
      DB::transaction(function () use ($id) {
         $link = Link::find($id);
         LinkItem::where('item_link', $link->url_name)->delete();
         ShetabitVisit::where('link_id', $link->id)->delete();

         if ($link->qrcode_id) {
            QRCode::find($link->qrcode_id)->delete();
         }

         if ($link->custom_theme_id) {
            CustomTheme::where('link_id', $link->id)->delete();
         }

         $link->delete();
      }, 5);
   }
}
