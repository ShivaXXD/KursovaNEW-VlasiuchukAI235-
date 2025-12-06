<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;

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
// Тимчасовий маршрут для запуску міграцій через браузер
Route::get('/run-migration', function () {
    // 1. Очищаємо кеш (про всяк випадок)
    Artisan::call('config:clear');
    Artisan::call('cache:clear');

    // 2. Запускаємо міграцію та сідер
    // --force обов'язковий для продакшена
    Artisan::call('migrate:fresh --seed --force');

    return "База даних успішно оновлена та заповнена! Тепер видаліть цей маршрут.";
});