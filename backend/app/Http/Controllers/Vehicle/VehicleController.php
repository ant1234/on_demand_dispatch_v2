<?php

namespace App\Http\Controllers\Vehicle;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Validator;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Storage;
use Store;

class VehicleController extends Controller
{
    public function getVehicles(Request $request) {

        $data = DB::table('vehicles')
            ->select('*')
            ->get();

        return response($data, 200);

    }

    public function addImage(Request $request) {

        // Validate the request
        $request->validate([
            'id' => 'required',
            'image' => 'required|image|max:2043',
        ]);

        if($request->hasFile('image')) {
            $image = $request->file('image');
            $input['file'] = time() . '.' . $image->getClientOriginalExtension();
        }

        Storage::disk('public')
        ->put('images/' . $input['file'], file_get_contents($image));

        $imageURL = url('/') . '/storage/images/' . $input['file'];

        Vehicle::update([
            'image' => $imageUrl,
        ])->where('id', '=', $request->id);

        return response()->json([
            'message' => 'Vehicle image uploaded successfully.'
        ], 200);
        
    }

    public function store(Request $request) {

        // Validate the request
        $request->validate([
            'name' => 'required',
            'model' => 'required',
            'price' => 'required',
        ]);

        $vehicle = Vehicle::create([
            'name' => $request->name,
            'model' => $request->model,
            'price' => $request->price
        ]);

        return response()->json([
            'message' => 'Vehicle created successfully.',
            'vehicle' => $vehicle
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

        $vehicle = Vehicle::where('id', $request->id)->update([
            'name' => $request->name,
            'model' => $request->model,
            'price' => $request->price,
        ]);

        return response()->json([
            'message' => 'Vehicle updated successfully.',
            'vehicle' => $vehicle
        ], 200);
        
    }

    public function destroy(Request $request) {

        // Validate the request
        $request->validate([
            'id' => 'required',
        ]);

        Vehicle::where('id', $request->id)->delete();

        return response()->json([
            'message' => 'Vehicle removed successfully.'
        ], 200);
        
    }
}
