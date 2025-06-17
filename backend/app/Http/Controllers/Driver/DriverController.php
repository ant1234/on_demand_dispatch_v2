<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\User;
use App\Models\DriverStatus;
use App\Models\Vehicle;
use App\Models\DriverLocation;
use App\Events\DriverLocationEvent;

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
        $location = DriverLocation::where('user_id', $request->user_id)->first();

        $driverLocation = [
            'user_id' => $request->user_id,
            'location_address' => $request->address,
            'location_latitude' => $request->latitude,
            'location_longitude' => $request->longitude
        ];

        if (!is_null($location)) {

            DriverLocation::where('user_id', $request->user_id)
                ->update($driverLocation);

            // Trigger the event to broadcast the updated location
            DriverLocationEvent::dispatch($driverLocation);

            return response()->json(['message' => 'Driver location updated successfully']);

        } else {

            DriverLocation::create($driverLocation);

            DriverLocationEvent::dispatch($driverLocation);

            return response()->json(['message' => 'Driver location created successfully']); 
        }

    }

    public function getDriverLocation(Request $request)
    {
        $driverLocation = DriverLocation::where('user_id', $request->user_id)->first();
    
        if (!is_null($driverLocation)) {
            return response()->json([
                'data' => [
                    'address' => $driverLocation->location_address,
                    'latitude' => floatval($driverLocation->location_latitude),
                    'longitude' => floatval($driverLocation->location_longitude),
                ]
            ]);
        } else {
            return response()->json(['data' => []]);
        }
    }

}
