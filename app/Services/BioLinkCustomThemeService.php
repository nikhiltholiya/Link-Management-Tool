<?php

namespace App\Services;

use App\Models\Link;
use App\Models\CustomTheme;
use Illuminate\Support\Facades\DB;

class BioLinkCustomThemeService extends MediaService
{
    public function createTheme(array $data)
    {
        DB::transaction(function () use ($data) {
            $theme = CustomTheme::create($data);

            $link = Link::find($data['link_id']);
            $link->custom_theme_active = TRUE;
            $link->custom_theme_id = $theme->id;
            $link->save();
        }, 5);
    }

    public function updateTheme(string|int $id, array $data)
    {
        DB::transaction(function () use ($id, $data) {
            $theme = CustomTheme::query()->find($id);

            switch ($data['type']) {
                case 'bg_color':
                    $theme->background = "background-color: " . $data['bg_color'];
                    $theme->background_type = "color";
                    $theme->bg_color = $data['bg_color'];
                    $theme->save();
                    break;

                case 'bg_image':
                    $this->addNewDeletePrev($theme, $data['bg_image'], 'themeBgImage');
                    $theme->save();
                    break;

                default:
                    $theme->update($data);
                    break;
            }
        }, 5);

        DB::transaction(function () use ($id, $data) {
            $theme = CustomTheme::query()->find($id);

            if ($data['type'] === 'bg_image') {
                $fullUrl = $this->getMediaByName($theme, 'themeBgImage');
                $pathUrl = $fullUrl ? '/storage' . explode('storage', $fullUrl)[1] : null;

                $theme->bg_image = $fullUrl;
                $theme->background = "background-image: url($pathUrl)";
                $theme->background_type = "image";
                $theme->save();
            }
        }, 5);
    }

    public function activeTheme(string|int $id)
    {
        DB::transaction(function () use ($id) {
            $link = Link::find($id);
            $link->custom_theme_active = TRUE;
            $link->save();
        }, 5);
    }
}
