<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Mail\SendEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use App\Events\SendEmailEvenet;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'otp_code' => null,
            'is_valid_email' => User::IS_INVALID_EMAIL,
            'password' => bcrypt($request->password),
        ]);

        SendEmailEvenet::dispatch($user);

        // Return a response
        return response()->json([
            'message' => 'Your account has been registered successfully.', 
            'user' => $user], 201);
    }

}
