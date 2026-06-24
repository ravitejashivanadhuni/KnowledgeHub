<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Answer;
use App\Models\Question;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AdminController extends Controller
{
    public function stats()
    {
        return response()->json([
            'users' => User::count(),
            'experts' => User::where('role', 'expert')->count(),
            'articles' => Article::count(),
            'questions' => Question::count(),
            'answers' => Answer::count(),
        ]);
    }

    public function articles()
    {
        return Article::with('user')
            ->latest()
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'author' => $article->user?->name,
                    'category' => $article->category,
                ];
            });
    }

    public function deleteArticle($id)
{
    $article = \App\Models\Article::findOrFail($id);

    $article->delete();

    return response()->json([
        'message' => 'Article deleted successfully'
    ]);
}

public function questions()
{
    return \App\Models\Question::with('user')
        ->latest()
        ->get()
        ->map(function ($question) {
            return [
                'id' => $question->id,
                'title' => $question->title,
                'author' => $question->user?->name,
            ];
        });
}

public function deleteQuestion($id)
{
    $question = \App\Models\Question::findOrFail($id);

    $question->answers()->delete();

    $question->delete();

    return response()->json([
        'message' => 'Question deleted successfully'
    ]);
}

public function answers()
{
    return Answer::with(['user', 'question'])
        ->latest()
        ->get()
        ->map(function ($answer) {
            return [
                'id' => $answer->id,
                'answer' => $answer->answer,
                'author' => $answer->user?->name,
                'question' => $answer->question?->title,
            ];
        });
}

public function deleteAnswer($id)
{
    $answer = Answer::findOrFail($id);

    $answer->delete();

    return response()->json([
        'message' => 'Answer deleted successfully'
    ]);
}

public function createUser(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:6',
        'role' => 'required|in:admin,expert',
        'department' => 'nullable|string',
        'expertise' => 'nullable|string',
    ]);

    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
        'role' => $validated['role'],
        'department' => $validated['department'] ?? null,
        'expertise' => $validated['expertise'] ?? null,
        'points' => 0,
    ]);

    return response()->json([
        'message' => ucfirst($user->role) . ' created successfully',
        'user' => $user,
    ], 201);
}

public function users()
{
    return response()->json(
        User::select(
            'id',
            'name',
            'email',
            'role',
            'department',
            'expertise',
            'points',
            'created_at'
        )
        ->latest()
        ->get()
    );
}

public function deleteUser($id)
{
    $user = User::findOrFail($id);

    $user->delete();

    return response()->json([
        'message' => 'User deleted successfully'
    ]);
}

}