<?php

namespace App\Http\Controllers;

use App\Models\Article;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with('user')->get();

        $formattedArticles = $articles->map(function ($article) {
            return [
                'id' => $article->id,
                'title' => $article->title,
                'author' => $article->user?->name,
                'category' => $article->category,
            ];
        });

        return response()->json($formattedArticles);
    }
}