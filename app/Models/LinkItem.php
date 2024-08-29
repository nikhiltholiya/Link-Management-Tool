<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class LinkItem extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'link_id',
        'item_position',
        'item_type',
        'item_sub_type',
        'item_title',
        'item_link',
        'item_icon',
        'content',
    ];

    public function link()
    {
        return $this->belongsTo(Link::class);
    }
}
