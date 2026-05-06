<?php

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Wallet::create([
            'user_id' => $user->id,
        ]);

        $token = $user->createToken('app')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $token = $user->createToken('app')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function me(Request $request)
    {
        return $request->user();
    }
}
