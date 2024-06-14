<?php

namespace App\Services\SignIn;

use App\Models\User;
use App\Services\AccountImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use League\OAuth2\Client\Provider\Google;
use Throwable;

/**
 * Class GoogleSignInService.
 */
class GoogleSignInService
{
	public Request $request;
	public Google $provider;
	public AccountImageService $accountImageService;

	/**
	 * @param Request $request
	 * @param AccountImageService $accountImageService
	 */
	public function __construct(Request $request, AccountImageService $accountImageService)
	{
		$this->request = $request;
		$this->accountImageService = $accountImageService;
		$this->provider = new Google([
			'clientId' => config('services.google.client_id'),
			'clientSecret' => config('services.google.client_secret'),
			'redirectUri' => route('sign-in.google.callback')
		]);
	}

	/**
	 * @return string
	 */
	public function getSignInURL(): string
	{
		// Clear Session
		$this->request->session()->forget(['oauth2state']);

		// Generate Authorization URL
		$authUrl = $this->provider->getAuthorizationUrl();

		// Generate and store state in Session
		$this->request->session()->put('oauth2state', $this->provider->getState());

		// Return the auth URL
		return $authUrl;
	}

	/**
	 * @return void
	 * @throws IdentityProviderException
	 * @throws Throwable
	 */
	public function signIn(): void
	{
		// Get the token
		$token = $this->provider->getAccessToken('authorization_code', [
			'code' => $this->request->query('code')
		]);

		// Get account details
		$extUser = $this->provider->getResourceOwner($token);

		$user = User::where('email', $extUser->getEmail())->first();

		if ($user === null) {
			// Create new User
			$user = new User();
			$user->first_name = $extUser->getFirstName();
			$user->last_name = $extUser->getLastName();
			$user->username = $this->generateUsername($extUser);
			if(is_string($extUser->getAvatar())) {
				$user->image = $this->accountImageService->saveFileFromURL($extUser->getAvatar(), 'profile');
			}
			$user->email = $extUser->getEmail();
			$user->email_verified_at = now();
			$user->password = Hash::make(Str::random());
			$user->saveOrFail();
		}

		Auth::login($user);
	}

	/**
	 * @param $extUser
	 * @return string
	 */
	private function generateUsername($extUser): string
	{
		return strtolower($extUser->getFirstName() . mb_substr($extUser->getLastName(), 0, 1));
	}
}
