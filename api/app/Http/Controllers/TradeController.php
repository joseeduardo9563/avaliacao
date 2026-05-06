<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class TradeController extends Controller
{
    private function getPrice()
    {
        return rand(200000, 300000);
    }

    public function buy(Request $request)
    {
        return DB::transaction(function () use ($request) {

            $user = $request->user();
            $wallet = $user->wallet;
            $amount = $request->amount;
            $price = $this->getPrice();

            if ($amount > $wallet->balance_brl) {
                return response()->json(['message' => 'Saldo insuficiente'], 400);
            }

            $btc = $amount / $price;

            $wallet->balance_brl -= $amount;
            $wallet->balance_btc += $btc;
            $wallet->save();

            Transaction::create([
                'user_id' => $user->id,
                'type' => 'buy',
                'amount_brl' => $amount,
                'amount_btc' => $btc,
                'price' => $price,
            ]);

            return ['success' => true];
        });
    }

    public function sell(Request $request)
    {
        return DB::transaction(function () use ($request) {

            $user = $request->user();
            $wallet = $user->wallet;
            $amount = $request->amount;
            $price = $this->getPrice();

            $btc = $amount / $price;

            if ($btc > $wallet->balance_btc) {
                return response()->json(['message' => 'BTC insuficiente'], 400);
            }

            $wallet->balance_btc -= $btc;
            $wallet->balance_brl += $amount;
            $wallet->save();

            Transaction::create([
                'user_id' => $user->id,
                'type' => 'sell',
                'amount_brl' => $amount,
                'amount_btc' => $btc,
                'price' => $price,
            ]);

            return ['success' => true];
        });
    }
}
