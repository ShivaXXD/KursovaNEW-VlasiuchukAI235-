<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'sender_name', 'sender_email', 'message_text', 
        'is_processed', 'received_time'
    ];

    protected $casts = [
        'is_processed' => 'boolean',
        'received_time' => 'datetime',
    ];
}