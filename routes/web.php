<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StateController;
use App\Http\Controllers\CountryController;

Route::get('country', [CountryController::class, 'index']);
Route::get('country/{id}', [CountryController::class, 'show']);
Route::put('country/{id}', [CountryController::class, 'update']);
Route::post('country/store', [CountryController::class, 'store']);
Route::delete('country/{id}', [CountryController::class, 'destroy']);

Route::get('states/{id}', [StateController::class, 'index']);
Route::get('state/{id}', [StateController::class, 'show']);
Route::put('state/{id}', [StateController::class, 'update']);
Route::post('state/add', [StateController::class, 'store']);
Route::delete('state/{id}', [StateController::class, 'destroy']);

Route::view('/{any?}', 'welcome')->where('any', '.*');
