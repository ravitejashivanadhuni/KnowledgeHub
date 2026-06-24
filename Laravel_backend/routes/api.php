<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ExpertController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\AdminController;
use App\Models\Article;
use App\Models\Question;
use App\Models\User;
use App\Models\Answer;

Route::get('/dashboard', function () {
    return response()->json([
        'articles' => Article::count(),
        'questions' => Question::count(),
        'experts' => User::where('role', 'expert')->count(),
    ]);
});

Route::get('/admin/stats', [AdminController::class, 'stats']);
Route::delete('/admin/articles/{id}',[AdminController::class, 'deleteArticle']);
Route::get('/admin/articles', [AdminController::class, 'articles']);
Route::get('/articles', [ArticleController::class, 'index']);
Route::post('/articles', [ArticleController::class, 'store']);
Route::get('/experts', [ExpertController::class, 'index']);
Route::get('/articles/{id}', [ArticleController::class, 'show']);
Route::get('/questions', [QuestionController::class, 'index']);
Route::post('/questions', [QuestionController::class, 'store']);
Route::get('/admin/questions',[AdminController::class, 'questions']);
Route::delete('/admin/questions/{id}',[AdminController::class, 'deleteQuestion']);
Route::post('/answers', [AnswerController::class, 'store']);
Route::get('/questions/{id}', [QuestionController::class, 'show']);
Route::get(
    '/admin/answers',
    [AdminController::class, 'answers']
);

Route::delete(
    '/admin/answers/{id}',
    [AdminController::class, 'deleteAnswer']
);