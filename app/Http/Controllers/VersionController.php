<?php

namespace App\Http\Controllers;

use App\Services\VersionUpdateService;
use Illuminate\Support\Facades\File;

class VersionController extends Controller
{
    private VersionUpdateService $versionUpdate;

    public function __construct()
    {
        $this->versionUpdate = new VersionUpdateService();
    }

    /**
     * Checking the latest or available version.
     */
    public function checkVersion()
    {
        $last_version = $this->versionUpdate->getLastVersion();
        $last_version['update_available'] = false;

        if (version_compare($last_version['version'], $this->getCurrentVersion(), ">")) {
            $last_version['update_available'] = true; // Trigger the new version available.
            return $last_version;
        }

        return $last_version; // Always return the json because of changelog data.
    }

    /**
     * Updating the current version to latest version
     */
    public function updateVersion()
    {
        ini_set('max_execution_time', 600); // 600 seconds = 10 minutes 
        $this->versionUpdate->log(trans("updater.SYSTEM_VERSION") . $this->getCurrentVersion(), 'info');

        $last_version_info = $this->versionUpdate->getLastVersion();
        if ($last_version_info['version'] <= $this->getCurrentVersion()) {
            $this->versionUpdate->log(trans("updater.ALREADY_UPDATED"), 'info');
            return back()->with('error', 'The system is already updated to last version');
        }

        $last_version = $this->versionUpdate->download($last_version_info['archive']);
        if (!$last_version) {
            return back()->with('error', 'Latest version download failed');
        }

        $installation = $this->versionUpdate->installation($last_version, $last_version_info, $this->getCurrentVersion());
        if (!$installation) {
            return back()->with('error', 'An error occurred during installation');
        } else {
            return back()->with('success', 'Congratulations! Your app successfully updated by the latest version');
        }
    }

    /**
     * Getting the current installed versiont
     */
    public function getCurrentVersion()
    {
        $version = File::get(base_path() . '/version.txt');

        return $version;
    }
}
