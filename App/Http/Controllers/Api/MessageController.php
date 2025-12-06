<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // Admin: Список всіх повідомлень
    public function index()
    {
        // Сортуємо: нові зверху
        return Message::orderBy('received_time', 'desc')->get();
    }

    // Public: Відправка повідомлення з форми контактів
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sender_name' => 'required|string|max:100', // name з форми
            'sender_email' => 'required|email|max:100', // email з форми
            'message_text' => 'required|string',        // message з форми
        ]);

        // Створюємо повідомлення (is_processed за замовчуванням false у БД)
        $message = Message::create($validated);

        return response()->json([
            'message' => 'Повідомлення успішно відправлено',
            'data' => $message
        ], 201);
    }

    // Admin: Перемкнути статус (Оброблено / Не оброблено)
    public function toggleStatus($id)
    {
        $message = Message::findOrFail($id);
        $message->is_processed = !$message->is_processed;
        $message->save();
        
        return response()->json($message);
    }

    // Admin: Видалити повідомлення
    public function destroy($id)
    {
        Message::destroy($id);
        return response()->json(['message' => 'Повідомлення видалено']);
    }
}