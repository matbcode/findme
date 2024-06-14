<?php

namespace App\Http\Controllers;

use App\Models\Identity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
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
		$identity->title = $request->input('title');
		$identity->first_name = $request->input('first_name');
		$identity->middle_name = $request->input('middle_name');
		$identity->last_name = $request->input('last_name');
		$identity->nickname = $request->input('nickname');
		$identity->age = $request->input('age');
		$identity->description = $request->input('description');
		$identity->save();

		return redirect()->back();
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
