<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = ['username', 'password_hash'];

    protected $hidden = ['password_hash'];

    // Вказуємо Laravel, що поле пароля називається 'password_hash'
    public function getAuthPassword()
    {
        return $this->password_hash;
    }
}