<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()
            ->transactions()
            ->latest()
            ->get();
    }
}
