<?php

namespace App\Http\Controllers\Vehicle;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Validator;
use App\Models\Vehicle;

class VehicleController extends Controller
{
    public function getVehicles(Request $request) {

    }

    public function addImage(Request $request) {
        
    }

    public function store(Request $request) {

        // Validate the request
        $request->validate([
            'name' => 'required',
            'model' => 'required',
            'price' => 'required',
        ]);

        Vehicle::create([
            'name' => $request->name,
            'model' => $request->model,
            'price' => $request->price
        ]);

        return response()->json([
            'message' => 'Vehicle created successfully.'
        ], 200);
        
    }

    public function update(Request $request) {

        // Validate the request
        $request->validate([
            'id' => 'required',
            'name' => 'required',
            'model' => 'required',
            'price' => 'required',
        ]);

        Vehicle::update([
            'id' => $request->id,
            'name' => $request->name,
            'model' => $request->model,
            'price' => $request->price,
        ])->where('id', '=', $request->id);

        return response()->json([
            'message' => 'Vehicle updated successfully.'
        ], 200);
        
    }

    public function destroy(Request $request) {

        // Validate the request
        $request->validate([
            'id' => 'required',
            'name' => 'required',
            'model' => 'required',
            'price' => 'required',
        ]);

        Vehicle::delete()->where('id', '=', $request->id);

        return response()->json([
            'message' => 'Vehicle removed successfully.'
        ], 200);
        
    }
}
