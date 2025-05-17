<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Mail\SendEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use App\Events\SendEmailEvent;
use DB;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required',
        ]);

        $otp_code = User::generateOtp();

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'otp_code' => $otp_code,
            'is_valid_email' => User::IS_INVALID_EMAIL,
            'password' => bcrypt($request->password),
        ]);

        SendEmailEvent::dispatch($user);

        // Return a response
        return response()->json([
            'message' => 'Your account has been registered successfully.', 
            'user' => $user], 201);
    }

    public function login(Request $request)
    {
        // Validate the request
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        // Create the user
        $user = User::getUserByEmail($request->email);

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'errors' => [
                    'message' => 'Email or password incorrect.',
                    // 'isLogged' => false
                ],
            ], 401);
        }


        return response()->json([
            'message' => 'User logged in successfully.',
            'user' => $user,
            'token' => $user->otp_code,
            'isLogged' => true
        ], 200);

    }

    public function logout(Request $request)
    {

        DB::table('personal_access_tokens')
            ->where('tokenable_id',$request->userId)
            ->delete();

        return response()->json(['message' => 'User logged out successfully.'], 200);
    }

    public function validateUserEmail(Request $request)
    {
        // Validate the request
        $request->validate([
            'email' => 'required|string|email|max:255',
            'otp_code' => 'required|string|max:6',
        ]);

        // Find the user
        $user = User::getUserByEmail($request->email);

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        // Check if the OTP code is valid
        if ($user->otp_code !== $request->otp_code) {
            return response()->json(['message' => 'Invalid OTP code.'], 400);
        }

        // Update the user's email verification status
        $user->is_valid_email = User::IS_VALID_EMAIL;
        $user->save();

        return response()->json([
            'message' => 'Email verified successfully.',
            'user' => $user,
            'token' => $user->otp_code,
        ], 200);
    }

}
