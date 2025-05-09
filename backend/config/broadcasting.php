<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Broadcast Driver
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default broadcast driver that should be used
    | by your application. The "pusher" driver is a great option, but you
    | can also use others such as "redis" or even "soketi" if preferred.
    |
    */

    'default' => env('BROADCAST_DRIVER', 'pusher'),

    /*
    |--------------------------------------------------------------------------
    | Broadcast Connections
    |--------------------------------------------------------------------------
    |
    | Here you can define all the broadcast connections that will be used
    | by your application. Each connection will have its own set of
    | options, like the "pusher" service.
    |
    */

    'connections' => [
        'pusher' => [
            'driver' => 'pusher',
            'key' => env('PUSHER_APP_KEY'),
            'secret' => env('PUSHER_APP_SECRET'),
            'app_id' => env('PUSHER_APP_ID'),
            'options' => [
                'host' => env('PUSHER_HOST', 'soketi'),
                'port' => env('PUSHER_PORT', 6001),
                'scheme' => env('PUSHER_SCHEME', 'http'),
                'encrypted' => false,
                'useTLS' => env('PUSHER_USE_TLS', false),
            ],
            'log' => true,
        ],
    ],
];