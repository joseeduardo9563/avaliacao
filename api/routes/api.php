<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\MarketController;
use App\Http\Controllers\TradeController;
use App\Http\Controllers\TransactionsController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/wallet', [WalletController::class, 'index']);

    Route::get('/market/btc', [MarketController::class, 'btc']);

    Route::post('/trade/buy', [TradeController::class, 'buy']);
    Route::post('/trade/sell', [TradeController::class, 'sell']);

    Route::get('/transactions', [TransactionsController::class, 'index']);
});