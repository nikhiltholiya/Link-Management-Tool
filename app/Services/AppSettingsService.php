<?php

namespace App\Services;

use App\Models\SmtpSetting;
use App\Models\SocialLogin;
use Illuminate\Support\Facades\DB;

class AppSettingsService extends MediaService
{
   public function updateAppInfo(array $data)
   {
      DB::transaction(function () use ($data) {
         $app = app('setting');

         $app->update([
            'title' => $data['title'],
            'copyright' => $data['copyright'],
            'description' => $data['description'],
         ]);

         if ($data['logo']) {
            $this->addSingleFile($app, $data['logo']);
         }
      }, 5);
   }


   public function updateSocialLogin(string $name, array $data)
   {
      DB::transaction(function () use ($name, $data) {
         SocialLogin::where('name', $name)->update($data);
      }, 5);
   }


   public function updateSMTP(array $data)
   {
      DB::transaction(function () use ($data) {
         SmtpSetting::first()->update([
            'host' => $data['host'],
            'port' => $data['port'],
            'username' => $data['username'],
            'password' => $data['password'],
            'encryption' => $data['encryption'],
            'sender_email' => $data['from_address'],
            'sender_name' => $data['from_name'],
         ]);
      }, 5);
   }
}
