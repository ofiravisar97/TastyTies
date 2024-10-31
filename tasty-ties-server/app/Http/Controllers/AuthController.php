<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Models\UserData;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        $data = $request->validated();

        DB::beginTransaction();

        $user = User::create([
            "email" => $data['email'],
            "password" => $data['password'],
            "displayName" => $data['displayName']
        ]);



        DB::commit();

        $token = $user->createToken('auth_token')->plainTextToken;


        return response()->json([
            'user' => $user,
            'access_token' => $token
        ]);
    }

    public function login(LoginRequest $request){
        $data = $request->validated();


        $credentials = [
            'email' => $data['email'],
            'password' => $data['password']
        ];

        $user = User::where("email",$request->email)->firstOrFail();


        if(!$user || !Hash::check($credentials['password'],$user->password)){
            return response()->json([
                'error' => "Wrong credentials"
            ],401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        $userData = [
            "email" => $user->email,
            "displayName" => $user->displayName,
            "avatarURL" => $user->avatarURL,
            "id" => $user->id
        ];

        return response()->json([
            'message' => 'Login Success',
            'access_token' => $token,
            'user' => $userData
        ],200);
    }

    public function logout(){

    }
}
