<?php

namespace App\Services;

use App\Models\Link;
use App\Models\QRCode;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;

class QRCodeService extends ProjectService
{
   public function getQrCodes(array $data): LengthAwarePaginator
   {
      return DB::transaction(function () use ($data) {
         $user = app('user');
         $SA = $user->hasRole('SUPER-ADMIN');
         $page = array_key_exists('per_page', $data) ? intval($data['per_page']) : 10;

         $qrcodes = QRCode::when(!$SA, function ($query) use ($user) {
            return $query->where('user_id', $user->id);
         })
            ->orderBy('created_at', 'desc')
            ->with('link')
            ->with('project')
            ->paginate($page);

         return $qrcodes;
      }, 5);
   }


   public function createQrCode(array $data)
   {
      DB::transaction(function () use ($data) {
         $qrCode = QRCode::create($data);

         if (array_key_exists('link_id', $data) && $data['link_id']) {
            Link::find($data['link_id'])
               ->update(['qrcode_id' => $qrCode->id]);
         }
      }, 5);
   }


   public function deleteQrCode(int|string $id)
   {
      DB::transaction(function () use ($id) {
         $qrCode = QRCode::find($id);

         if ($qrCode->link_id) {
            Link::where('id', $qrCode->link_id)
               ->update(['qrcode_id' => NULL]);
         }

         $qrCode->delete();
      }, 5);
   }
}
