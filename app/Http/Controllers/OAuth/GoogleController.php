<?php

namespace App\Http\Controllers\OAuth;

use App\Http\Controllers\Controller;
use App\Services\Authorization\GoogleAuthorizationService;
use App\Services\SignIn\GoogleSignInService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class GoogleController extends Controller
{
	/**
	 * Redirect to Google Sign In OAuth
	 *
	 * @param GoogleSignInService $googleSignInService
	 * @return Response
	 */
	public function initiateSignIn(GoogleSignInService $googleSignInService)
	{
		return Inertia::location($googleSignInService->getSignInURL());
	}

	/**
	 * Handle Sign In Callback
	 *
	 * @param GoogleSignInService $google
	 * @return RedirectResponse
	 * @throws IdentityProviderException
	 * @throws Throwable
	 */
	public function handleSignInCallback(GoogleSignInService $google): RedirectResponse
	{
		$google->signIn();
		return redirect()->intended('dashboard');
	}
}
