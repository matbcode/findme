<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IdentityController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Authenticated
Route::middleware(['auth', 'verified'])->group(function () {
	// Identity
	Route::post('/identity/store', [IdentityController::class, 'store'])->name('identity.store');
	Route::get('/identity/{identity}', [IdentityController::class, 'edit'])->name('identity.edit');
	Route::patch('/identity/{identity}/update', [IdentityController::class, 'update'])->name('identity.update');
	Route::post('/identity/{identity}/image', [IdentityController::class, 'image'])->name('identity.image');
	Route::delete('/identity/{identity}/delete', [IdentityController::class, 'destroy'])->name('identity.delete');

	// Dashboard
	Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

	// Profile
	Route::post('/profile/storage', [ProfileController::class, 'storage'])->name('profile.storage');
	Route::post('/profile/image', [ProfileController::class, 'image'])->name('profile.image');
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
	Route::get('/profile/notifications/retrieve', [ProfileController::class, 'retrieveNotifications'])->name('profile.notifications.retrieve');
	Route::get('/profile/notifications/mark-as-read', [ProfileController::class, 'markNotificationsAsRead'])->name('profile.notifications.mark-as-read');
});

Route::get('/id/{identity}', [IdentityController::class, 'show'])->name('identity.show');

require __DIR__ . '/auth.php';
require __DIR__ . '/static.php';
