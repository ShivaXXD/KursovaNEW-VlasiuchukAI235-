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
Route::get('/debug-files', function () {
    $path = app_path('Http/Controllers');
    $output = "<h2>Вміст папки Controllers:</h2>";
    
    if (is_dir($path)) {
        $files = scandir($path);
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') continue;
            
            $output .= "📂 $file<br>";
            
            // Якщо це папка (наприклад Api), зайдемо всередину
            if (is_dir("$path/$file")) {
                $subfiles = scandir("$path/$file");
                foreach ($subfiles as $sub) {
                    if ($sub === '.' || $sub === '..') continue;
                    $output .= "&nbsp;&nbsp;&nbsp;&nbsp;📄 $sub<br>";
                }
            }
        }
    } else {
        $output .= "Папку не знайдено!";
    }
    return $output;
});