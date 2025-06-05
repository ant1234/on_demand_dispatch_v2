<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\User;
use App\Models\DriverStatus;
use App\Models\Vehicle;
use App\Models\DriverLocation;

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

    public function storeDriverLocation(Request $request)
    {
        $driverLocation = DriverLocation::where('user_id', $request->user_id)->first();

        if (!is_null($driverLocation)) {
            DriverLocation::where('user_id', $request->user_id)
                ->update([
                    'location_address' => $request->address,
                    'location_latitude' => $request->latitude,
                    'location_longitude' => $request->longitude
                ]);

            return response()->json(['message' => 'Driver location updated successfully']);

        } else {

            DriverLocation::create([
                'user_id' => $request->user_id,
                'location_address' => $request->address,
                'location_latitude' => $request->latitude,
                'location_longitude' => $request->longitude
            ]);
            return response()->json(['message' => 'Driver location created successfully']); 
        }

    }

    public function getDriverLocation(Request $request)
    {
        $driverLocation = DriverLocation::where('user_id', $request->user_id)->first();

        if (!is_null($driverLocation)) {
            return response()->json([
                'address' => $driverLocation->location_address,
                'latitude' => $driverLocation->location_latitude,
                'longitude' => $driverLocation->location_longitude
            ]);
        } else {
            return response([]);
        }
    }

}
