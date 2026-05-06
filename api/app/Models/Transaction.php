<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    Schema::create('transactions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        $table->string('type'); // buy | sell
        $table->decimal('amount_brl', 15, 2);
        $table->decimal('amount_btc', 15, 8);
        $table->decimal('price', 15, 2);
        $table->timestamps();
    });
}
