<?php

namespace App\Http\Controllers;

use App\Models\Identity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Image;
use Throwable;

class IdentityController extends Controller
{
	/**
	 * @param Identity $identity
	 * @return Response
	 */
	public function show(Identity $identity): Response
	{
		return Inertia::render('Identity/Show', [
			'identity' => $identity
		]);
	}

	/**
	 * @return RedirectResponse
	 * @throws Throwable
	 */
	public function store(): RedirectResponse
	{
		$identity = new Identity();
		$identity->first_name = 'First Name';
		$identity->saveOrFail();
		return to_route('identity.edit', $identity->id);
	}

	/**
	 * @param Identity $identity
	 * @return Response
	 */
	public function edit(Identity $identity): Response
	{
		return Inertia::render('Identity/Edit', [
			'identity' => $identity
		]);
	}

	/**
	 * @param Identity $identity
	 * @param Request $request
	 * @return RedirectResponse
	 */
	public function update(Identity $identity, Request $request): RedirectResponse
	{
		$identity->first_name = $request->input('first_name');
		$identity->middle_name = $request->input('middle_name');
		$identity->last_name = $request->input('last_name');
		$identity->nickname = $request->input('nickname');
		$identity->date_of_birth = $request->input('date_of_birth');
		$identity->description = $request->input('description');
		$identity->conditions = $request->input('conditions');
		$identity->allergies = $request->input('allergies');
		$identity->blood_type = $request->input('blood_type');
		$identity->caregiver_first_name = $request->input('caregiver_first_name');
		$identity->caregiver_last_name = $request->input('caregiver_last_name');
		$identity->caregiver_telephone = $request->input('caregiver_telephone');
		$identity->caregiver_email = $request->input('caregiver_email');
		$identity->caregiver_address = $request->input('caregiver_address');
		$identity->save();

		return redirect()->back();
	}

	/**
	 * @param Request $request
	 * @param Identity $identity
	 * @return RedirectResponse
	 */
	public function image(Request $request, Identity $identity): RedirectResponse
	{
		$request->validate([
			'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4096',
		]);

		// Delete the already existing file if exists
		if (!empty($identity->image)) {
			Storage::disk('public')->delete($identity->image);
		}

		// Handle the uploaded image
		$file = $request->file('image');
		$image = Image::fromPath($file->getRealPath());

		// Crop the image (example: 300x300)
		$image->fit(300, 300);

		// Define the new image path with WebP extension
		$webpPath = 'identity/' . uniqid() . '.webp';

		// Save the image directly as WebP to the disk
		Storage::disk('public')->put($webpPath, (string) $image->encode('webp', 90));

		// Update the image path in the identity model
		$identity->image = $webpPath;
		$identity->save();

		// Redirect
		return back();
	}

	/**
	 * @param Identity $identity
	 * @return RedirectResponse
	 */
	public function destroy(Identity $identity): RedirectResponse
	{
		$identity->delete();
		return to_route('dashboard');
	}
}
