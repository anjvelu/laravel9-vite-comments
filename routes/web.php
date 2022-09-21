<?php

use App\Http\Controllers\CommentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::middleware(['auth', 'verified'])->group(function () {
    Route::controller(CommentController::class)->group(function () {
        Route::get('/', 'index')->name('dashboard');
        Route::post('/', 'store');
    });
});


Route::middleware(['auth:admin'])->prefix('/admin')->group(function () {
    Route::controller(CommentController::class)->group(function () {
        Route::get('/', 'index')->name('admin.dashboard');
        Route::post('/', 'store');
    });
});
require __DIR__ . '/auth.php';
