<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\ChangeEmailVerification;
use Carbon\Carbon;

class SettingService extends MediaService
{
   public function updateProfile(array $data)
   {
      DB::transaction(function () use ($data) {
         $user = User::find(auth()->user()->id);
         $user->name = $data['name'];

         if (array_key_exists('phone', $data) && $data['phone']) {
            $user->phone = $data['phone'];
         }

         if (array_key_exists('image', $data) && $data['image']) {
            $this->addNewDeletePrev($user, $data['image'], 'profile');
         }

         $user->save();
      }, 5);
   }


   public function changeEmail(array $data)
   {
      DB::transaction(function () use ($data) {
         $app = app('setting');
         $user = User::find(auth()->user()->id);

         // Generate a unique token for email verification
         $token = Str::random(60);
         $url = route('save.email', ['token' => $token]);

         // Store the email change request in the database
         $user->email_change_new_email = $data['new_email'];
         $user->email_change_token = $token;
         $user->save();

         // Send an email with the verification link to the new email
         Mail::to($data['new_email'])->send(new ChangeEmailVerification($user, $app, $url));
      }, 5);
   }


   public function saveChangedEmail(string $token): bool
   {
      return DB::transaction(function () use ($token) {
         $user = User::find(auth()->user()->id);
         $within5Minutes = Carbon::parse($user->updated_at)->diffInMinutes(Carbon::now()) <= 5;

         if ($token === $user->email_change_token && $within5Minutes) {
            $user->email = $user->email_change_new_email;
         }

         $user->email_change_new_email = null;
         $user->email_change_token = null;
         $user->save();

         return $within5Minutes;
      }, 5);
   }
}
