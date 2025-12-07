<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_name', 'customer_email', 'service_name', 
        'service_price', 'is_processed', 'order_time'
    ];

    protected $casts = [
        'is_processed' => 'boolean',
        'order_time' => 'datetime',
    ];
}