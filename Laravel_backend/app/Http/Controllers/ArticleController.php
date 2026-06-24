<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

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

    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'category' => 'required|string|max:255',
    ]);

    $article = Article::create([
        'title' => $validated['title'],
        'content' => $validated['content'],
        'category' => $validated['category'],
        'user_id' => 1, // temporary demo user
        'status' => 'approved',
    ]);

    return response()->json([
        'message' => 'Article created successfully',
        'article' => $article
    ], 201);
}
public function show($id)
{
    $article = Article::with('user')->findOrFail($id);

    return response()->json([
        'id' => $article->id,
        'title' => $article->title,
        'content' => $article->content,
        'author' => $article->user?->name,
        'category' => $article->category,
        'created_at' => $article->created_at,
    ]);
}
}