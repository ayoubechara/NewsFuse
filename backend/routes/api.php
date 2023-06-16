<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserPreferenceController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/preferences', [UserPreferenceController::class, 'index']);
    Route::post('/preferences', [UserPreferenceController::class, 'update']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
// User Profile
Route::middleware('auth:sanctum')->put('/users/{user}', [UserController::class, 'update']);
Route::middleware('auth:sanctum')->put('/preferences', [UserPreferenceController::class, 'update']);


// Article routes
Route::middleware('auth:sanctum')->get('/articles', [ArticleController::class, 'index']);
Route::middleware('auth:sanctum')->get('/get-preferences', [ArticleController::class, 'getAllPreferences']);
