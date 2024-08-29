<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UsersService
{
   public function getUsers(array $data)
   {
      return DB::transaction(function () use ($data) {
         $page = array_key_exists('per_page', $data) ? intval($data['per_page']) : 10;

         $links = User::when(array_key_exists('search', $data), function ($query) use ($data) {
            return $query->where('name', 'LIKE', '%' . $data['search'] . '%')
               ->orWhere('email', 'LIKE', '%' . $data['search'] . '%');
         })
            ->orderBy('created_at', 'desc')
            ->with('pricing_plan')
            ->paginate($page);

         return $links;
      }, 5);
   }


   public function updateUser(int|string $id, array $data)
   {
      DB::transaction(function () use ($data, $id) {
         $user = User::find($id);
         $user->status = $data['status'];
         $user->save();
      }, 5);
   }
}
