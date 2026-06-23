<?php

namespace App\Http\Controllers;

use App\Models\User;

class ExpertController extends Controller
{
    public function index()
    {
        $experts = User::where('role', 'expert')
            ->select(
                'id',
                'name',
                'expertise',
                'department',
                'points'
            )
            ->get();

        return response()->json($experts);
    }
}