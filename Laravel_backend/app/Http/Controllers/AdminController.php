<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Answer;
use App\Models\Question;
use App\Models\User;

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
}