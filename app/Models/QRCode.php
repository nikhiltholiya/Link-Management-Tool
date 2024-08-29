<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QRCode extends Model
{
    use HasFactory;
    public $table = 'qrcodes';

    protected $fillable = [
        'user_id',
        'link_id',
        'project_id',
        'qr_type',
        'content',
        'img_data',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function link()
    {
        return $this->belongsTo(Link::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
