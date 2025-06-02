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
        
        if ($driversStatus) {
            $driversStatus->status = $request->status;
            $driversStatus->save();
        } else {
            DriverStatus::create([
                'user_id' => $request->user_id,
                'status' => $request->status
            ]);
        }
        return response()->json(['message' => 'Driver status updated successfully']);
    }
}
