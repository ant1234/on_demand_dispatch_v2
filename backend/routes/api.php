<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::controller(AuthController::class)->group(function () {

    Route::post('/users', 'register')
        ->name('users.register');

    Route::post('/login', 'login')
        ->name('users.login');

    Route::post('/users/verify-email', 'validateUserEmail')
        ->name('users.validateUserEmail');

});

Route::group(['middleware' => 'auth:sanctum'], function() {

    Route::controller(AuthController::class)->group(function () {

        Route::post('/logout', 'logout')
            ->name('users.logout');
    
        Route::get('/users', 'getUsers')
            ->name('users.getUsers');
    });

});





