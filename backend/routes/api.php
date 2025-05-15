<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller('Auth\AuthController')->group(function () {
    
    Route::post('users', 'register')
        ->name('users.register');

    Route::post('login', 'login')
        ->name('users.login');

    Route::post('users/verify-email', 'validateUserEmail')
        ->name('users.validateUserEmail');
});



