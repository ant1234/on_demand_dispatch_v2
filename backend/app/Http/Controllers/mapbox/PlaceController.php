<?php

namespace App\Http\Controllers\mapbox;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class PlaceController extends Controller
{
    public function fetchPlaces(Request $request)
    {
        $searchText = $request->query('query', ''); 
        $accessToken = env('MAPBOX_ACCESS_TOKEN');

        if (!$searchText || !$accessToken) {
            return response()->json(['error' => 'Missing search text or access token'], 400);
        }

        $url = "https://api.mapbox.com/geocoding/v5/mapbox.places/{$searchText}.json";

        $response = Http::get($url, [
            'access_token' => $accessToken,
            'limit' => 10,
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch data from Mapbox'], $response->status());
        }

        return $response->json();
    }
}
