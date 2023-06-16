<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        DB::table('users')->insert([
            'name' => "Ayoub Echara",
            'email' => "ayoub@gmail.com",
            'categories' => "[]",
            'sources' => "[]",
            'password' => Hash::make('ayoub1416'),
        ]);
        DB::table('categories')->insert([
            'name' => "Business",
        ]);
        DB::table('categories')->insert([
            'name' => "Entertainment",
        ]);
        DB::table('categories')->insert([
            'name' => "General",
        ]);
        DB::table('categories')->insert([
            'name' => "Health",
        ]);
        DB::table('categories')->insert([
            'name' => "Science",
        ]);
        DB::table('categories')->insert([
            'name' => "Sports",
        ]);
        DB::table('categories')->insert([
            'name' => "Technology",
        ]);
        DB::table('categories')->insert([
            'name' => "Politics",
        ]);
        DB::table('categories')->insert([
            'name' => "Culture",
        ]);
        DB::table('categories')->insert([
            'name' => "Fashion",
        ]);
        DB::table('categories')->insert([
            'name' => "Art",
        ]);
        DB::table('categories')->insert([
            'name' => "Food",
        ]);
        DB::table('categories')->insert([
            'name' => "World",
        ]);
    }
}
