<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\ImageManager;

/**
 * Class AccountImageService.
 */
class AccountImageService
{
	/**
	 * @param string $url The URL of the file to be saved.
	 * @param string $folder The folder where the file should be saved.
	 * @return string|null The path to the saved file, or null if an error occurs.
	 */
	public function saveFileFromURL(string $url, string $folder = 'account'): ?string
	{
		try {
			// Fetch the file from the URL
			$fileResponse = Http::get($url);

			// Generate a unique filename
			$filename = uniqid() . '.webp';
			$path = $folder . '/' . $filename;

			// Manipulate, encode, and save the file
			Storage::put($path, $this->manipulateImage($fileResponse->body()));

			// Return the path
			return $path;
		} catch (Exception $e) {
			Log::error('Failed to save file: ' . $e->getMessage());
			return null;
		}
	}

	/**
	 * Manipulate an image to fit the specified dimensions, and encode it.
	 *
	 * @param string $image The raw image string.
	 * @return string
	 */
	private function manipulateImage(string $image): string
	{
		// Open the image using intervention/image
		$manager = new ImageManager(new Driver());
		$image = $manager->read($image);

		// Resize and crop the image to fit the specified dimensions
		$image->coverDown(config('raichi.account_image.width'), config('raichi.account_image.height'));

		// Save the manipulated image
		return $image->encode(new WebpEncoder(config('raichi.account_image.quality')))->toString();
	}
}
