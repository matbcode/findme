<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('username')->nullable();
            $table->string('filename')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('image')->nullable();
			$table->string('locale')->default('en-GB');
			$table->string('timezone')->default('Europe/London');
			$table->string('password');
			$table->string('email')->unique();
			$table->boolean('email_notifications')->default(0);
			$table->boolean('2fa')->default(0);
			$table->boolean('trial_used')->default(0);
			$table->enum('theme', ['light', 'dark'])->default('dark');
			$table->timestamp('email_verified_at')->nullable();
            $table->json('storage')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
