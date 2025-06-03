<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\User;
use App\Models\DriverStatus;
use App\Models\Vehicle;

class DriverController extends Controller
{
    //
    public function changeDriverStatus(Request $request)
    {
        $driversStatus = DriverStatus::where('user_id', $request->user_id)->first();

        $isValidStatus = DriverStatus::checkDriverStatus($request->status);

        if (!is_null($driversStatus)) {
            if($driversStatus == DriverStatus::STATUS_UNAVAILABLE)
            {
                DriverStatus::where('user_id', $request->user_id)
                ->update(['status' => DriverStatus::STATUS_AVAILABLE]);

                return response()->json(['message' => 'Driver status updated successfully']);

            } else {
                DriverStatus::where('user_id', $request->user_id)
                ->update(['status' => DriverStatus::STATUS_UNAVAILABLE]);   
                
                return response()->json(['message' => 'Driver status updated successfully']);

            }
        } else {
            DriverStatus::create([
                'user_id' => $request->user_id,
                'status' => $request->status
            ]);
        }
        return response()->json(['message' => 'Driver status updated successfully']);
    }

}
