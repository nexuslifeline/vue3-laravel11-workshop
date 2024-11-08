<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
use App\Http\Controllers\TaskController;

// Default API routes
Route::prefix('v1')->group(function () {
    Route::apiResource('tasks', TaskController::class);
});
