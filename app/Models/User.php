<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
	use HasApiTokens, HasFactory, Notifiable;

	/**
	 * The attributes that are mass assignable
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'username',
		'first_name',
		'last_name',
		'email',
		'password',
		'phone_number',
		'theme',
		'2fa',
		'locale',
		'timezone',
		'email_notifications',
	];

	/**
	 * The attributes that should be hidden for serialization
	 *
	 * @var array<int, string>
	 */
	protected $hidden = [
		'password',
		'remember_token',
		'email_verified_at'
	];

	/**
	 * The attributes that should be cast.
	 *
	 * @var array<string, string>
	 */
	protected $casts = [
		'email_verified_at' => 'datetime',
		'password' => 'hashed',
		'storage' => 'json'
	];

	/**
	 * Workspaces assigned to this User
	 *
	 * @return BelongsToMany
	 */
	public function workspaces(): BelongsToMany {
		return $this->belongsToMany(Workspace::class);
	}

	/**
	 * Projects assigned to this User
	 *
	 * @return BelongsToMany
	 */
	public function projects(): BelongsToMany {
		return $this->belongsToMany(Project::class);
	}

	/**
	 * Workspace Invitations
	 *
	 * @return HasMany
	 */
	public function invitations(): HasMany {
		return $this->hasMany(Invitation::class, 'email', 'email');
	}

	/**
	 * Google Drives assigned to this User
	 *
	 * @return HasMany
	 */
	public function googleDrives(): HasMany
	{
		return $this->hasMany(GoogleDrive::class);
	}

	/**
	 * The channel this User receives Notification broadcasts on
	 *
	 * @return string
	 */
	public function receivesBroadcastNotificationsOn(): string
	{
		return 'user.'.$this->id;
	}
}
