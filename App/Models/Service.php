<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'icon', 'title', 'description_short', 'price',
        'image_url', 'page_title', 'page_subtitle', 'page_description', 'page_features',
        'performer_name', 'performer_role', 'performer_photo_url', 'performer_bio'
    ];

    // Автоматично перетворює JSON з БД в масив PHP і навпаки
    protected $casts = [
        'page_features' => 'array',
    ];
}