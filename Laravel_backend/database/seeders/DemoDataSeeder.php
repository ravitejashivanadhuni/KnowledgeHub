<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Article;
use App\Models\Question;
use App\Models\Answer;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        User::truncate();
        Article::truncate();
        Question::truncate();
        Answer::truncate();
        User::insert([
            [
                'name' => 'Sarah Johnson',
                'email' => 'sarah@example.com',
                'role' => 'expert',
                'department' => 'Recruitment',
                'expertise' => 'Talent Acquisition',
                'points' => 120,
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Michael Brown',
                'email' => 'michael@example.com',
                'role' => 'expert',
                'department' => 'Operations',
                'expertise' => 'Operations',
                'points' => 95,
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Emily Davis',
                'email' => 'emily@example.com',
                'role' => 'expert',
                'department' => 'Client Services',
                'expertise' => 'Client Management',
                'points' => 80,
                'password' => bcrypt('password')
            ],
            [
                'name' => 'John Smith',
                'email' => 'john@example.com',
                'role' => 'employee',
                'department' => 'Recruitment',
                'expertise' => null,
                'points' => 20,
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Lisa Wilson',
                'email' => 'lisa@example.com',
                'role' => 'employee',
                'department' => 'Operations',
                'expertise' => null,
                'points' => 15,
                'password' => bcrypt('password')
            ],
        ]);

        Article::insert([
            [
                'title' => 'Best Practices for Talent Acquisition',
                'content' => 'Guide for effective hiring.',
                'category' => 'Recruitment',
                'user_id' => 1,
                'status' => 'approved'
            ],
            [
                'title' => 'Client Communication Guidelines',
                'content' => 'Tips for managing clients.',
                'category' => 'Operations',
                'user_id' => 2,
                'status' => 'approved'
            ],
            [
                'title' => 'Handling Large Hiring Campaigns',
                'content' => 'Strategies for bulk hiring.',
                'category' => 'Recruitment',
                'user_id' => 3,
                'status' => 'approved'
            ]
        ]);

        Question::insert([
            [
                'title' => 'How do we handle bulk hiring projects?',
                'description' => 'Looking for best practices.',
                'user_id' => 4,
                'status' => 'open'
            ],
            [
                'title' => 'Best way to improve client communication?',
                'description' => 'Need guidance for long-term relationships.',
                'user_id' => 5,
                'status' => 'open'
            ],
            [
                'title' => 'How should project handovers be documented?',
                'description' => 'Looking for templates.',
                'user_id' => 4,
                'status' => 'open'
            ]
        ]);

        Answer::insert([
    [
        'question_id' => 1,
        'user_id' => 1,
        'answer' => 'Use structured screening and automated assessments.'
    ],
    [
        'question_id' => 1,
        'user_id' => 2,
        'answer' => 'Create a standardized evaluation process.'
    ],
    [
        'question_id' => 2,
        'user_id' => 1,
        'answer' => 'Schedule regular client check-ins.'
    ],
    [
        'question_id' => 3,
        'user_id' => 3,
        'answer' => 'Use a handover checklist and documentation template.'
    ]
]);
    }
}