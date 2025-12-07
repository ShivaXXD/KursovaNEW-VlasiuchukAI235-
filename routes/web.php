<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;


Route::get('/debug-fix', function () {
    try {
        Artisan::call('route:clear');
        Artisan::call('config:clear');
        Artisan::call('cache:clear');
    } catch (\Exception $e) {
        // Ігноруємо помилки кешу
    }

    $pathControllers = app_path('Http/Controllers');
    $output = "<h1>Діагностика файлової системи (Linux Case Sensitivity)</h1>";
    
    $output .= "<h3>Вміст папки 'app/Http/Controllers':</h3><ul>";
    
    if (is_dir($pathControllers)) {
        $files = scandir($pathControllers);
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') continue;
            $output .= "<li>📄 $file";
            
            if (is_dir($pathControllers . '/' . $file)) {
                $output .= " ➡️ <strong>ЦЕ ПАПКА!</strong>";
                $output .= "<ul>";
                $subfiles = scandir($pathControllers . '/' . $file);
                foreach ($subfiles as $sub) {
                    if ($sub === '.' || $sub === '..') continue;
                    $output .= "<li>📄 $sub</li>";
                }
                $output .= "</ul>";
            }
            $output .= "</li>";
        }
    }
    $output .= "</ul>";

    return $output;
});

Route::get('/{any?}', function () {
    $path = public_path('index.html');
    if (File::exists($path)) {
        return File::get($path);
    }
    return "React index.html not found.";
})->where('any', '.*');