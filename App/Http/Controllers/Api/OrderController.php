<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Admin: Список всіх замовлень
    public function index()
    {
        return Order::orderBy('order_time', 'desc')->get();
    }

    // Public: Клієнт робить замовлення
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required',
            'customer_email' => 'required|email',
            'service_name' => 'required',
            'service_price' => 'required|integer',
        ]);

        $order = Order::create($validated);
        // Тут можна додати відправку Email повідомлення

        return response()->json($order, 201);
    }

    // Admin: Змінити статус (Виконано / В обробці)
    public function toggleStatus($id)
    {
        $order = Order::findOrFail($id);
        $order->is_processed = !$order->is_processed;
        $order->save();
        return response()->json($order);
    }

    public function destroy($id)
    {
        Order::destroy($id);
        return response()->json(['message' => 'Замовлення видалено']);
    }
}