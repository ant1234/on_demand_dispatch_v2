<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    const IS_VALID_EMAIL = 1;
    const IS_INVALID_EMAIL = 0;
    const ADMIN_ROLE = 'ADMIN';
    const CUSTOMER_ROLE = 'CUSTOMER';
    const DRIVER_ROLE = 'DRIVER';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'otp_code',
        'is_valid_email',
        'google_id',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public static function generateOtp($length = 6)
    {
        if ($length <= 0) {
            return '';
        }

        $opt = '';

        for ($i = 0; $i < $length; $i++) {
            $opt .= mt_rand(0, 9);
        }
        return $opt;
    }

    public static function getUserByEmail(string $email)
    {
        return User::where('email', $email)->first();
    }
}
