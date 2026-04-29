<?php

use App\Http\Controllers\Auths\MicrosoftController;
use Illuminate\Support\Facades\Route;

//Route::middleware('guest')->group(function () {
    Route::get('/login/microsoft', [MicrosoftController::class, 'redirect'])->name('auth.microsoft.redirect');
    Route::get('/auth/microsoft', [MicrosoftController::class, 'callback'])->name('auth.microsoft.callback');
//});

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
