<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CustomTheme extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'link_id',
        'background',
        'background_type',
        'text_color',
        'btn_type',
        'btn_transparent',
        'btn_radius',
        'btn_bg_color',
        'btn_text_color',
        'font_family',
    ];
}
