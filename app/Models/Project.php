<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'project_name',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function qrcodes()
    {
        return $this->hasMany(QRCode::class);
    }
}
