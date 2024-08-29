<?php

namespace App\Helpers;

use App\Models\User;
use App\Models\SmtpSetting;

class Utils
{
   public static function smtp()
   {
      $smtp = SmtpSetting::first();

      config(['mail.mailers.smtp.host' => $smtp->host]);
      config(['mail.mailers.smtp.port' => (int) $smtp->port]);
      config(['mail.mailers.smtp.username' => $smtp->username]);
      config(['mail.mailers.smtp.password' => $smtp->password]);
      config(['mail.mailers.smtp.encryption' => $smtp->encryption]);
      config(['mail.from.address' => $smtp->sender_email]);
      config(['mail.from.name' => $smtp->sender_name]);

      return $smtp;
   }


   public static function user()
   {
      $id = auth()->user()->id;
      // ->with('qrcodes')
      // ->with('billing')
      // ->with('pricing_plan')
      // ->with('subscription')

      return User::query()->find($id);
   }


   public static function limitChecker($item, $count)
   {
      $user = self::user();

      if ($user->hasRole('SUPER-ADMIN')) {
         return false;
      };

      $limit = ($user->pricing_plan[$item]);

      if ($limit != 'Unlimited') {
         if ((int) $limit <= $count) {
            return ucfirst($item) . ' creation limit over now. Please update your current plan to get more limit.';
         };
      }

      return false;
   }


   public static function exportToCSV($dataList, array $columns, string $filename)
   {
      $csvFileName = $filename . time() . '.csv';
      $headers = [
         'Content-Type' => 'text/csv',
         'Content-Disposition' => "attachment; filename=$csvFileName",
         'Filename' => $csvFileName,
      ];

      $output = fopen('php://output', 'w');
      fputcsv($output, $columns);

      foreach ($dataList as $data) {
         $row = [];
         foreach ($columns as $column) {
            $row[] = $data->{$column};
         }
         fputcsv($output, $row);
      }

      fclose($output);

      return $headers;
   }


   public static function getFileArray($content)
   {
      $newContent = str_replace('array (', '[', var_export($content, true));
      $newContent = str_replace(')', ']', $newContent);

      foreach ($content as $key => $elements) {
         $newContent = str_replace("$key =>", "", $newContent);
      }

      $newContent = preg_replace('/\n\s*(?=\[)/', "", $newContent);

      return "<?php\n\nreturn " . $newContent . ';';
   }
}
