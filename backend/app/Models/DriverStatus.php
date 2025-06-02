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

}
