<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Answer;

class AnswerController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'question_id' => 'required|integer|exists:questions,id',
            'answer' => 'required|string',
        ]);

        $answer = Answer::create([
            'question_id' => $validated['question_id'],
            'user_id' => $request->user()->id,
            'answer' => $validated['answer'],
        ]);

        return response()->json([
            'message' => 'Answer created successfully',
            'answer' => $answer
        ], 201);
    }
}