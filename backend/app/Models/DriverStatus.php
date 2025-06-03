<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class DriverStatus extends Model
{
    //
    protected $guarded = [];

    const STATUS_AVAILABLE = 1;
    const STATUS_UNAVAILABLE = 0;

    public static function checkDriverStatus($status)
    {
        switch ($status) {
            case self::STATUS_AVAILABLE:
                return true;
            case self::STATUS_UNAVAILABLE:
                return true;
            default:
                return false;
        }
    }


    public static function getDriverStatusById($userId)
    {
        $driverStatus = DriverStatus::where('user_id', $userId)->first();

        if (is_null($driverStatus)) {
            return response()->json(['message' => 'Driver status not found'], 404);
        }

        return response()->json(['status' => $driverStatus->status]);
    }
}
