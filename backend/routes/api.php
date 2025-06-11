<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Vehicle\VehicleController;
use App\Http\Controllers\mapbox\PlaceController;
use App\Http\Controllers\Driver\DriverController;
use App\Http\Controllers\Customer\CustomerTripController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function () {

    Route::post('/users', 'register')
        ->name('users.register');

    Route::post('/login', 'login')
        ->name('users.login');

    Route::post('/users/verify-email', 'validateUserEmail')
        ->name('users.validateUserEmail');

});

Route::controller(DriverController::class)->group(function () {

    Route::post('/driver/status', 'changeDriverStatus')
        ->name('driver.changeDriverStatus');

    Route::post('/driver_location', 'storeDriverLocation')
        ->name('driver.storeDriverLocation');

    Route::get('/get_driver_location', 'getDriverLocation')
        ->name('driver.getDriverLocation');

});

Route::controller(CustomerTripController::class)->group(function () {

    Route::post('/customer_trip', 'storeCustomerTrip')
        ->name('customer.storeCustomerTrip');

    Route::get('/customer_trip', 'getCustomerTripData')
        ->name('customer.getCustomerTripData');

    Route::get('/driver_location/customer', 'getDriverLocationForCustomer')
        ->name('customer.getDriverLocationForCustomer');

    Route::get('/customer_location/driver', 'getCustomerTripDataForDriver')
        ->name('customer.getCustomerTripDataForDriver');

});

Route::controller(PlaceController::class)->group(function () {

    Route::get('/places', 'fetchPlaces')
        ->name('places.fetchPlaces');

});



// Route::group(['middleware' => 'auth:sanctum'], function() {

    Route::controller(AuthController::class)->group(function () {

        Route::post('/logout', 'logout')
            ->name('users.logout');
    
        Route::get('/users', 'getUsers')
            ->name('users.getUsers');

        Route::post('/users/modify-role', 'updateRole')
            ->name('users.updateRole');

    });

    Route::controller(VehicleController::class)->group(function () {

        Route::post('/vehicles', 'store')
            ->name('vehicles.logout');

        Route::get('/vehicles', 'getVehicles')
            ->name('vehicles.getVehicles');

        Route::post('/vehicles/image', 'addImage')
            ->name('vehicles.addImage');
    
        Route::put('/vehicles', 'update')
            ->name('vehicles.update');

        Route::delete('/vehicles', 'destroy')
            ->name('vehicles.destroy');
            
    });

// });





