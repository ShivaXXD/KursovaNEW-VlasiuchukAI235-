<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            // Блок 1: Картка
            $table->string('icon', 50);
            $table->string('title', 100);
            $table->text('description_short');
            $table->integer('price');
            
            // Блок 2: Сторінка
            $table->string('image_url', 255);
            $table->string('page_title', 100);
            $table->string('page_subtitle', 255);
            $table->text('page_description');
            $table->json('page_features'); // JSON тип для масиву features

            // Блок 3: Виконавець
            $table->string('performer_name', 100);
            $table->string('performer_role', 100);
            $table->string('performer_photo_url', 255);
            $table->text('performer_bio');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};