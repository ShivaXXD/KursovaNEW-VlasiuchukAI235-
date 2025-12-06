<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServiceController; 
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\MessageController;

// --- Публічні маршрути (Public) ---

// Автентифікація
Route::post('/login', [AuthController::class, 'login']);

// Послуги (тільки перегляд)
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);

// Команда (тільки перегляд)
Route::get('/team', [TeamController::class, 'index']);

// Оформлення замовлення та Контактна форма
Route::post('/orders', [OrderController::class, 'store']);
Route::post('/messages', [MessageController::class, 'store']);


// --- Захищені маршрути (Admin Only) ---
Route::middleware('auth:sanctum')->group(function () {
    
    // Вихід
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Управління послугами (Admin)
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    // Управління командою (Admin)
    Route::post('/team', [TeamController::class, 'store']);
    Route::put('/team/{id}', [TeamController::class, 'update']);
    Route::delete('/team/{id}', [TeamController::class, 'destroy']);

    // Управління замовленнями (Admin)
    Route::get('/orders', [OrderController::class, 'index']);
    Route::patch('/orders/{id}/toggle', [OrderController::class, 'toggleStatus']);
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

    // Управління повідомленнями (Admin)
    Route::get('/messages', [MessageController::class, 'index']);
    Route::patch('/messages/{id}/toggle', [MessageController::class, 'toggleStatus']);
    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);
});