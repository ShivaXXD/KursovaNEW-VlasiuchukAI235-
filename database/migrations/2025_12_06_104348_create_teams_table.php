<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team', function (Blueprint $table) { // Таблиця називається 'team' (однина) згідно з оригіналом
            $table->id();
            $table->string('name', 100);
            $table->string('role_short', 100);
            $table->string('role_full', 100);
            $table->string('photo_url', 255);
            $table->text('bio_short');
            $table->text('bio_full');
            $table->json('competencies'); // JSON тип для компетенцій

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team');
    }
};