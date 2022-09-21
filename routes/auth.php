<?php

use App\Http\Controllers\Auth\AdminAuthenticatedSessionController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});
Route::middleware('guest:admin')->prefix('admin')->group(function () {
    Route::get('login', [AdminAuthenticatedSessionController::class, 'create'])
        ->name('admin-login');

    Route::post('login', [AdminAuthenticatedSessionController::class, 'store']);
});
Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
Route::middleware('auth:admin')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
