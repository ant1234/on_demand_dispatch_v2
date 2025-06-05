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
        $customerTrip = CustomerTrip::where('user_id', $request->user_id)->first();

        if (!is_null($customerTrip)) {
            
            CustomerTrip::where('user_id', $request->user_id)
                ->where('trip_status', CustomerTrip::ONGOING_STATUS)
                ->update([
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

            return response()->json(['message' => 'Customer trip updated successfully']);
        } else {
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
        }
        return response()->json(['message' => 'Customer trip created successfully']);
    }
}
