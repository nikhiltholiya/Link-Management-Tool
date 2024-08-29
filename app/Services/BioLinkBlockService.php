<?php

namespace App\Services;

use App\Models\LinkItem;
use Illuminate\Support\Facades\DB;

class BioLinkBlockService extends LinkService
{
   public function createBlock(array $data)
   {
      DB::transaction(function () use ($data) {
         $link = LinkItem::create($data);

         if ($data['image']) {
            $this->addNewDeletePrev($link, $data['image']);
         }
      }, 5);
   }


   public function updateBLock(int|string $id, array $data)
   {
      DB::transaction(function () use ($data, $id) {
         $link = LinkItem::find($id);
         $link->update($data);

         if ($data['image']) {
            $this->addNewDeletePrev($link, $data['image']);
         }
      }, 5);
   }


   public function changeBlockPosition(int|string $id, array $linkItems)
   {
      DB::transaction(function () use ($id, $linkItems) {
         foreach ($linkItems as $item) {
            LinkItem::where('id', $item->id)->update([
               'item_position' => $item->position
            ]);
         }
      }, 5);
   }


   public function deleteBlock(int|string $id)
   {
      DB::transaction(function () use ($id) {
         LinkItem::find($id)->delete();
      }, 5);
   }
}
