<?php

use App\Http\Controllers\LocalizationController;
use Illuminate\Support\Facades\Route;


Route::get('/lang/{local}', [LocalizationController::class, 'languageChange']);
Route::post('/lang/add', [LocalizationController::class, 'create']);
Route::put('/lang/update/{local}/{file}', [LocalizationController::class, 'update']);
Route::put('/lang/status/{local}', [LocalizationController::class, 'localStatus']);
