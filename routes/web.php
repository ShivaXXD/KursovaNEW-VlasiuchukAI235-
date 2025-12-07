<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

// Цей код каже Laravel: "Якщо запит не йде на API, віддай файл index.html з папки public"
Route::get('/{any?}', function () {
    $path = public_path('index.html');

    if (File::exists($path)) {
        return File::get($path);
    }

    return "Помилка: Файл index.html не знайдено. Перевірте, чи спрацював 'npm run build' у Dockerfile.";
})->where('any', '.*'); // Регулярний вираз захоплює всі маршрути