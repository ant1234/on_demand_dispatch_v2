<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\CustomerTrip;

class CustomerTripController extends Controller
{
    //
    public function storeCustomerTrip(Request $request)
    {
        $customerTrip = CustomerTrip::where('user_id', $request->user_id)
            ->where('vehicle_id', $request->vehicle_id)
            ->first();

        if (!is_null($customerTrip)) {
            
            CustomerTrip::create([
                    'location_address' => $request->location_address,
                    'location_latitude' => $request->location_latitude,
                    'location_longitude' => $request->location_longitude,
                    'destination_address' => $request->destination_address,
                    'destination_latitude' => $request->destination_latitude,
                    'destination_longitude' => $request->destination_longitude,
                    'trip_status' => CustomerTrip::ONGOING_STATUS,
                    'user_id' => $request->user_id,
                    'vehicle_id' => $request->vehicle_id,
                    'distance' => round($distance, 2),
                    'total_price' => $totalPrice,
                ]);

            return response()->json(['message' => 'Customer trip created successfully']);
        }
    }

    public function getCustomerTripData(Request $request)
    {
        $customerTrip = CustomerTrip::where('user_id', $request->user_id)
            ->where('vehicle_id', $request->vehicle_id)
            ->where('trip_status', $request->trip_status)
            ->first();

        if (!is_null($customerTrip)) {
            return response([
                'location_address' => $customerTrip->location_address,
                'location_latitude' => $customerTrip->location_latitude,
                'location_longitude' => $customerTrip->location_longitude,
                'destination_address' => $customerTrip->destination_address,
                'destination_latitude' => $customerTrip->destination_latitude,
                'destination_longitude' => $customerTrip->destination_longitude,
                'trip_status' => $customerTrip->trip_status,
                'user_id' => $customerTrip->user_id,
                'vehicle_id' => $customerTrip->vehicle_id,
            ], 200);
        } else {
            return response([]);
        }
    }
}
