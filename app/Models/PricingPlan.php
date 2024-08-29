<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PricingPlan extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'description',
        'status',
        'monthly_price',
        'yearly_price',
        'currency',
        'biolinks',
        'biolink_blocks',
        'shortlinks',
        'projects',
        'qrcodes',
        'themes',
        'custom_theme',
        'support',
    ];
}
