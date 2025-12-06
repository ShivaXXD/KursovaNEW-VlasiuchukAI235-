<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

// Цей маршрут перехоплює ВСІ запити (крім API) і віддає React-додаток
Route::get('/{any?}', function () {
    // Шлях до index.html, який згенерував React при збірці
    $path = public_path('index.html');

    // Якщо файл існує - віддаємо його
    if (File::exists($path)) {
        return File::get($path);
    }

    // Якщо раптом файлу немає (наприклад, локально без збірки) - помилка
    return "React frontend not found. Did you run 'npm run build'?";
})->where('any', '.*'); // Регулярний вираз: "будь-що"