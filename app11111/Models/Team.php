<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    // Вказуємо назву таблиці явно, оскільки Laravel шукає 'teams'
    protected $table = 'team'; 

    protected $fillable = [
        'name', 'role_short', 'role_full', 'photo_url',
        'bio_short', 'bio_full', 'competencies'
    ];

    protected $casts = [
        'competencies' => 'array',
    ];
}