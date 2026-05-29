<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {

    return response()->json([
        'message' => 'Backend Laravel funcionando correctamente'
    ])

    ->header('Access-Control-Allow-Origin', '*')
    ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    ->header('Access-Control-Allow-Headers', '*');

});