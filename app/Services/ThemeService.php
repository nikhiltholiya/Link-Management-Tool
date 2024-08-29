<?php

namespace App\Services;

use App\Models\Theme;
use Illuminate\Support\Facades\DB;

class ThemeService
{
   public function create(array $data)
   {
      DB::transaction(function () use ($data) {
      }, 5);
   }


   public function updateThemeType(int|string $id, string $type)
   {
      DB::transaction(function () use ($type, $id) {
         $theme = Theme::find($id);
         $theme->type = $type;
         $theme->save();
      }, 5);
   }
}
