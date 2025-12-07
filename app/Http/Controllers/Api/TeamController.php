<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    // Public: Отримати список всіх співробітників
    public function index()
    {
        // Повертаємо всіх, сортуємо за ID (як в оригіналі)
        return Team::orderBy('id', 'asc')->get();
    }

    // Admin: Додати співробітника
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'role_short' => 'required|string|max:100',
            'role_full' => 'required|string|max:100',
            'photo_url' => 'required|url',
            'bio_short' => 'required|string',
            'bio_full' => 'required|string',
            'competencies' => 'required|array', 
        ]);

        $member = Team::create($validated);
        return response()->json($member, 201);
    }

    // Admin: Оновити дані співробітника
    public function update(Request $request, $id)
    {
        $member = Team::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'role_short' => 'required|string|max:100',
            'role_full' => 'required|string|max:100',
            'photo_url' => 'required|url',
            'bio_short' => 'required|string',
            'bio_full' => 'required|string',
            'competencies' => 'required|array',
        ]);

        $member->update($validated);
        return response()->json($member);
    }

    // Admin: Видалити співробітника
    public function destroy($id)
    {
        Team::destroy($id);
        return response()->json(['message' => 'Співробітника видалено']);
    }
}