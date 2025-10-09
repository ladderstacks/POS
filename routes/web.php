<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function (Request $request) {
    // // Content Security Policy
    header("Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self'; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; connect-src: 'self' *; media-src: 'self';");

    // X-Content-Type-Options
    header("X-Content-Type-Options: nosniff");

    // X-Frame-Options
    header("X-Frame-Options: DENY");

    // X-XSS-Protection
    header("X-XSS-Protection: 1; mode=block");

    // Referrer Policy
    header("Referrer-Policy: no-referrer");

    // Strict Transport Security (HSTS) - only if HTTPS
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
        header("Strict-Transport-Security: max-age=63072000; includeSubDomains; preload");
    }
    return view('welcome');
});

// include 'upgrade.php';
