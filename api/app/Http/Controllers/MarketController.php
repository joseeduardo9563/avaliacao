<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MarketController extends Controller
{
    public function btc()
    {
        return [
            'price' => rand(200000, 300000)
        ];
    }
}
