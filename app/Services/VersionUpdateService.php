<?php

namespace App\Services;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use ZipArchive;

class VersionUpdateService
{
   private $tmp_backup_dir;

   public function __construct()
   {
      $this->tmp_backup_dir = base_path('backup-temp');
   }


   public function log($msg, $type = 'info')
   {
      //Response HTML
      ini_set('memory_limit', '-1');

      //   if ($append_response)
      //       $this->response_html .= $msg . "<BR>";

      //Log
      $header = "LinkDrop Updater - ";
      if ($type == 'info')
         Log::info($header . '[info]' . $msg);
      elseif ($type == 'warn')
         Log::error($header . '[warn]' . $msg);
      elseif ($type == 'err')
         Log::error($header . '[err]' . $msg);
      else
         return;
   }


   public function setCurrentVersion($version)
   {
      File::put(base_path() . '/version.txt', $version);
   }


   public function getLastVersion()
   {
      $curl = curl_init();
      $url = config('installer.app_version_url') . '/linkdrop.json';

      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

      $last_version = curl_exec($curl);
      curl_close($curl);

      $last_version = json_decode($last_version, true);

      return $last_version;
   }


   public function download($filename)
   {
      ini_set('max_execution_time', 600); //600 seconds = 10 minutes 
      $this->log(trans("updater.DOWNLOADING"), 'info');

      $tmp_folder = base_path() . '/' . config('installer.tmp_folder');

      if (!is_dir($tmp_folder)) {
         File::makeDirectory($tmp_folder, $mode = 0755, true, true);
      }

      try {
         $local_file = $tmp_folder . '/' . $filename;
         $remote_file_url = config('installer.app_update_url') . '/' . $filename;
         $curl = curl_init();

         curl_setopt($curl, CURLOPT_URL, $remote_file_url);
         curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

         $update = curl_exec($curl);
         curl_close($curl);

         File::put($local_file, $update);
      } catch (\Exception $e) {
         $this->log(trans("updater.DOWNLOADING_ERROR"), 'err');
         $this->log(trans("updater.EXCEPTION") . $e->getMessage(), 'err');

         return false;
      }

      $this->log(trans("updater.DOWNLOADING_SUCCESS"), 'info');

      return $local_file;
   }


   public function installation($lastVersion, $lastVersionInfo, $currentVersion)
   {
      try {
         // backup current version
         $this->log('Current installed version backup started', 'info');
         Artisan::call('backup:run');
         $this->log('Current installed version backup successful', 'info');

         Artisan::call('down'); // Maintenance mode ON
         $this->log(trans("updater.MAINTENANCE_MODE_ON"), 'info');

         $installation = $this->zipExtract($lastVersion);

         if (!$installation) {
            $this->log(trans("updater.INSTALLATION_ERROR"), 'err');

            $path = storage_path('app/backup-main');
            $files = array_diff(scandir($path), array('..', '.'));

            // Restoring previous installed version after failed current installation.
            $this->zipExtract($path . '/' . end($files));
            $this->log('Restore the previous installed version', 'info');
         } else {
            $this->setCurrentVersion($lastVersionInfo['version']);
            $this->log(trans("updater.INSTALLATION_SUCCESS"), 'info');

            $this->log(trans("updater.SYSTEM_VERSION") . $lastVersionInfo['version'], 'info');
            Artisan::call('migrate');
         }

         Artisan::call('up'); // Maintenance mode OFF
         Artisan::call('optimize:clear');
         $this->log(trans("updater.MAINTENANCE_MODE_OFF"), 'info');

         return $installation;
      } catch (\Throwable $th) {
         $this->log(trans("updater.EXCEPTION") . $th->getMessage(), 'err');

         $path = storage_path('app/backup-main');
         $files = array_diff(scandir($path), array('..', '.'));

         if (count($files) > 0) {
            $this->zipExtract($path . '/' . end($files));
         }

         Artisan::call('up'); // Maintenance mode OFF
         Artisan::call('optimize:clear'); // Clear cache after failed update
         $this->log(trans("updater.MAINTENANCE_MODE_OFF"), 'info');

         return false;
      }
   }


   public function zipExtract($archive)
   {
      ini_set('max_execution_time', 600); //600 seconds = 10 minutes 

      try {
         $execute_commands = false;
         $update_script = base_path() . '/' . config('installer.tmp_folder') . '/' . config('installer.script_file');

         $zip = new ZipArchive;
         if ($zip->open($archive) === TRUE) {
            $archive = substr($archive, 0, -4);
            $this->log(trans("updater.CHANGELOG"), 'info');

            for ($i = 0; $i < $zip->numFiles; $i++) {
               $zip_item = $zip->statIndex($i);
               $filename = $zip_item['name'];
               $dirname = dirname($filename);

               // Exclude files
               if (substr($filename, -1) == '/' || dirname($filename) === $archive || substr($dirname, 0, 2) === '__') {
                  continue;
               }

               // Exclude the version.txt
               if (strpos($filename, 'version.txt') !== false) {
                  continue;
               }

               if (substr($dirname, 0, strlen($archive)) === $archive) {
                  $dirname = substr($dirname, (-1) * (strlen($dirname) - strlen($archive) - 1));
               }

               //set new purify path for current file
               $filename = $dirname . '/' . basename($filename);

               if (!is_dir(base_path() . '/' . $dirname)) {
                  // Make NEW directory (if it already exists in the current version, continue...)
                  mkdir(base_path() . '/' . $dirname, 0755, true);
                  $this->log(trans("updater.DIRECTORY_CREATED") . $dirname, 'info');
               }

               if (!is_dir(base_path() . '/' . $filename)) {
                  // Overwrite a file with its latest version
                  $contents = $zip->getFromIndex($i);

                  if (strpos($filename, 'upgrade.php') !== false) {
                     file_put_contents($update_script, $contents);
                     $execute_commands = true;
                  } else {
                     // if (file_exists(base_path() . '/' . $filename)) {
                     //    $this->versionUpdate->log(trans("updater.FILE_EXIST") . $filename, 'info');
                     // }

                     // $this->versionUpdate->log(trans("updater.FILE_COPIED") . $filename, 'info');
                     file_put_contents(base_path() . '/' . $filename, $contents, LOCK_EX);
                  }
               }
            }

            $zip->close();
         } else {
            return false;
         }

         if ($execute_commands) {
            require_once($update_script);
            unlink($update_script);
            $this->log(trans("updater.EXECUTE_UPDATE_SCRIPT") . ' (\'upgrade.php\')', 'info');
         }

         File::delete($archive);
         File::deleteDirectory($this->tmp_backup_dir);
         $this->log(trans("updater.TEMP_CLEANED"), 'info');

         return true;
      } catch (\Exception $e) {

         $this->log(trans("updater.EXCEPTION") . $e->getMessage(), 'err');
         return false;
      }
   }
}
