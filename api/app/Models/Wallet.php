<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    Schema::create('wallets', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        $table->decimal('balance_brl', 15, 2)->default(10000);
        $table->decimal('balance_btc', 15, 8)->default(0);
        $table->timestamps();
    });
}
