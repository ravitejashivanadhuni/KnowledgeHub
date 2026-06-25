<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\ExpertController;
use App\Http\Controllers\QuestionController;

use App\Models\Article;
use App\Models\Question;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {
    return response()->json([
        'articles' => Article::count(),
        'questions' => Question::count(),
        'experts' => User::where('role', 'expert')->count(),
    ]);
});

Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{id}', [ArticleController::class, 'show']);

Route::get('/questions', [QuestionController::class, 'index']);
Route::get('/questions/{id}', [QuestionController::class, 'show']);

Route::get('/experts', [ExpertController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Authenticated User Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Authentication
    |--------------------------------------------------------------------------
    */

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    /*
    |--------------------------------------------------------------------------
    | Content Creation
    |--------------------------------------------------------------------------
    */

    Route::post('/articles', [ArticleController::class, 'store']);
    Route::post('/questions', [QuestionController::class, 'store']);
    Route::post('/answers', [AnswerController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('/admin/stats', [AdminController::class, 'stats']);

    /*
    |--------------------------------------------------------------------------
    | Articles
    |--------------------------------------------------------------------------
    */

    Route::get('/admin/articles', [AdminController::class, 'articles']);
    Route::delete('/admin/articles/{id}', [AdminController::class, 'deleteArticle']);

    /*
    |--------------------------------------------------------------------------
    | Questions
    |--------------------------------------------------------------------------
    */

    Route::get('/admin/questions', [AdminController::class, 'questions']);
    Route::delete('/admin/questions/{id}', [AdminController::class, 'deleteQuestion']);

    /*
    |--------------------------------------------------------------------------
    | Answers
    |--------------------------------------------------------------------------
    */

    Route::get('/admin/answers', [AdminController::class, 'answers']);
    Route::delete('/admin/answers/{id}', [AdminController::class, 'deleteAnswer']);

    /*
    |--------------------------------------------------------------------------
    | User Management
    |--------------------------------------------------------------------------
    */

    Route::post('/admin/users', [AdminController::class, 'createUser']);
    Route::get('/admin/users', [AdminController::class, 'users']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);
});