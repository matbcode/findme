<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'x' => [
        'client_id' => 'SjdVYkl4QWVDVFY1TG9yZmJJc0w6MTpjaQ',
        'client_secret' => '9VmlDpC7cMRvz0QimsbE1xr4wAra_ha7O3gj23bzcXscYSj1tZ',
        'bearer_token' => 'AAAAAAAAAAAAAAAAAAAAAOW8sQEAAAAAXRpLtHdgzDp5GUlii2T8ZvbtrZo%3Do9V0Loozy6G18jba7nW05TxGsr3jTbd1IyXlwMB5ptmfS3tJY9',
        'consumer_key' => 'idN12hIa7PsnQ9x1rSZ9rlM3b',
        'consumer_secret' => '6zyIAJRGs4VkH8ihjKr9UqkXhPwhOzhHtVPFY3W3PiUdmIgSRy',
    ],

	'meta' => [
		'client_id' => env('META_CLIENT_ID'),
		'client_secret' => env('META_CLIENT_SECRET'),
		'api_version' => env('META_GRAPH_API_VERSION'),
	],

	'discord' => [
		'client_id' => env('DISCORD_CLIENT_ID'),
		'client_secret' => env('DISCORD_CLIENT_SECRET'),
	],

	'google' => [
		'client_id' => env('GOOGLE_CLIENT_ID'),
		'client_secret' => env('GOOGLE_CLIENT_SECRET'),
	],

	'microsoft' => [
		'client_id' => env('MICROSOFT_CLIENT_ID'),
		'client_secret' => env('MICROSOFT_CLIENT_SECRET'),
	],

	'linkedin' => [
		'client_id' => env('LINKEDIN_CLIENT_ID'),
		'client_secret' => env('LINKEDIN_CLIENT_SECRET'),
	],

	'tiktok' => [
		'client_id' => env('TIKTOK_CLIENT_ID'),
		'client_secret' => env('TIKTOK_CLIENT_SECRET'),
	],

	'snapchat' => [
		'client_id' => env('SNAPCHAT_CLIENT_ID'),
		'client_secret' => env('SNAPCHAT_CLIENT_SECRET'),
	],

];
