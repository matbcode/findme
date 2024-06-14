<?php

namespace App\Http\Controllers;

use App\Http\Requests\Profile\ProfileUpdateRequest;
use App\Models\Accounts\DiscordAccount;
use App\Models\Accounts\GoogleAccount;
use App\Models\Accounts\MetaAccount;
use App\Models\Accounts\XAccount;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
	/**
	 * Edit current User
	 *
	 * @param Request $request
	 * @return Response
	 */
	public function edit(Request $request): Response
	{
		return Inertia::render('Profile/Edit', [
			'mustVerifyEmail' => !$request->user()->email_verified_at,
			'status' => session('status'),
			'notifications' => $request->user()->notifications,
			'accounts' => [
				'meta' => MetaAccount::where('user_id', $request->user()->id)->with('instagramAccounts.projects')->with('facebookPages.projects')->get(),
				'x' => XAccount::where('user_id', $request->user()->id)->with('projects')->get(),
				'google' => GoogleAccount::where('user_id', $request->user()->id)->get(),
				'discord' => DiscordAccount::where('user_id', $request->user()->id)->get()
			]
		]);
	}

	/**
	 * Update User's profile information
	 *
	 * @param ProfileUpdateRequest $request
	 * @return RedirectResponse
	 */
	public function update(ProfileUpdateRequest $request): RedirectResponse
	{
		$request->user()->fill($request->validated());

		if ($request->user()->isDirty('email')) {
			$request->user()->email_verified_at = null;
		}

		$request->user()->save();

		return Redirect::route('profile.edit');
	}

	/**
	 * Delete the User
	 *
	 * @param Request $request
	 * @return RedirectResponse
	 */
	public function destroy(Request $request): RedirectResponse
	{
		$request->validate([
			'password' => ['required', 'current_password'],
		]);

		$user = $request->user();

		Auth::logout();

		$user->delete();

		$request->session()->invalidate();
		$request->session()->regenerateToken();

		return Redirect::to('/');
	}

	/**
	 * Update the User's storage
	 *
	 * @param Request $request
	 * @return void
	 */
	public function storage(Request $request)
	{
		$request->user()->storage = $request->input('data');
		$request->user()->save();
	}

	/**
	 * Upload User's Avatar
	 *
	 * @param Request $request
	 * @return RedirectResponse
	 */
	public function image(Request $request)
	{
		// Delete the already existing file if exists
		if (!empty($request->user()->image)) {
			Storage::disk('public')->delete($request->user()->image);
		}

		// Upload and update Profile
		$request->user()->image = $request->file('image')->store('profile');
		$request->user()->save();

		// Redirect
		return back();
	}

	/**
	 * Retrieve Notifications as JSON
	 *
	 * @param Request $request
	 * @return JsonResponse
	 */
	public function retrieveNotifications(Request $request)
	{
		// Fetch the Notifications
		$notifications = $request->user()->unreadNotifications;

		// Return JSON
		return response()->json($notifications);
	}

	/**
	 * Mark unread Notifications as read
	 *
	 * @param Request $request
	 * @return void
	 */
	public function markNotificationsAsRead(Request $request)
	{
		$request->user()->unreadNotifications->markAsRead();
	}
}
