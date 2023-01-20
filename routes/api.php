<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('orders', '\App\Http\Controllers\Api\OrdersController@index');
Route::post('orders/update', '\App\Http\Controllers\Api\OrdersController@update');
Route::delete('orders/delete', '\App\Http\Controllers\Api\OrdersController@deleteOrder');
Route::post('orders/create', '\App\Http\Controllers\Api\OrdersController@store');

