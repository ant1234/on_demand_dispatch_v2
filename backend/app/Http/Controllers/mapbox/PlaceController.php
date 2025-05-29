<?php

namespace App\Http\Controllers\mapbox;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PlaceController extends Controller
{
    public function fetchPlaces(Request $request)
    {
        $searchText = !is_null($request->query) ? $request->query : '';
        $accessToken = env('MAPBOX_ACCESS_TOKEN');

        $url = "https://api.mapbox.com/search/geocode/v6/forward";

        $response = Http::get($url, ['q' => $searchText, 'access_token' => $accessToken]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch data from Mapbox'], $response->status());
        }
        return response()->json(json_decode($response), 200);
    }
}
