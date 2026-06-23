<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ExpertController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\AnswerController;
use App\Models\Article;
use App\Models\Question;
use App\Models\User;

Route::get('/dashboard', function () {
    return response()->json([
        'articles' => Article::count(),
        'questions' => Question::count(),
        'experts' => User::where('role', 'expert')->count(),
    ]);
});

Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/experts', [ExpertController::class, 'index']);
Route::get('/questions', [QuestionController::class, 'index']);
Route::post('/questions', [QuestionController::class, 'store']);
Route::post('/answers', [AnswerController::class, 'store']);
Route::get('/questions/{id}', [QuestionController::class, 'show']);