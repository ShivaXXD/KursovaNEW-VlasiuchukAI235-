<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // Public: Отримати список (для карток)
    public function index()
    {
        return Service::select('id', 'icon', 'title', 'description_short', 'price')->get();
    }

    // Public: Отримати повну інформацію
    public function show($id)
    {
        return Service::findOrFail($id);
    }

    // Admin: Створити
    public function store(Request $request)
    {
        $validated = $request->validate([
            'icon' => 'required',
            'title' => 'required',
            'description_short' => 'required',
            'price' => 'required|integer',
            'image_url' => 'required|url',
            'page_title' => 'required',
            'page_subtitle' => 'required',
            'page_description' => 'required',
            'page_features' => 'required|array', 
            'performer_name' => 'required',
            'performer_role' => 'required',
            'performer_photo_url' => 'required|url',
            'performer_bio' => 'required',
        ]);

        $service = Service::create($validated);
        return response()->json($service, 201);
    }

    // Admin: Оновити
    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        // Валідація аналогічна store, можна винести в FormRequest
        $service->update($request->all());
        return response()->json($service);
    }

    // Admin: Видалити
    public function destroy($id)
    {
        Service::destroy($id);
        return response()->json(['message' => 'Послугу видалено']);
    }
}