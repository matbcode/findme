<?php

use Inertia\Inertia;

// Landing page
Route::get('/', function () {
	return Inertia::render('Website/Welcome');
})->name('static.welcome');

// Privacy Policy
Route::get('/privacy-policy', function () {
	return Inertia::render('Website/PrivacyPolicy');
})->name('static.privacy-policy');

// Terms & Conditions
Route::get('/terms-and-conditions', function () {
	return Inertia::render('Website/TermsAndConditions');
})->name('static.terms-and-conditions');

// Cookie Policy
Route::get('/cookie-policy', function () {
	return Inertia::render('Website/CookiePolicy');
})->name('static.cookie-policy');