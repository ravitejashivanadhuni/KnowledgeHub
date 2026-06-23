<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index()
    {
        $questions = Question::with(['user', 'answers'])->get();

        $formattedQuestions = $questions->map(function ($question) {
            return [
                'id' => $question->id,
                'title' => $question->title,
                'description' => $question->description,
                'author' => $question->user?->name,
                'answers' => $question->answers->count(),
            ];
        });

        return response()->json($formattedQuestions);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
    ]);

    $question = Question::create([
        'title' => $validated['title'],
        'description' => $validated['description'],
        'user_id' => 4, // temporary demo user
        'status' => 'open',
    ]);

    return response()->json([
        'message' => 'Question created successfully',
        'question' => $question
    ], 201);
}

public function show($id)
{
    $question = Question::with([
        'user',
        'answers.user'
    ])->findOrFail($id);

    return response()->json([
        'id' => $question->id,
        'title' => $question->title,
        'description' => $question->description,
        'author' => $question->user?->name,
        'answers_count' => $question->answers->count(),
        'answers' => $question->answers->map(function ($answer) {
            return [
                'id' => $answer->id,
                'author' => $answer->user?->name,
                'answer' => $answer->answer,
                'created_at' => $answer->created_at,
            ];
        }),
    ]);
}
}