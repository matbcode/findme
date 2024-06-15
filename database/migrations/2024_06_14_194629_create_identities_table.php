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
        Schema::create('identities', function (Blueprint $table) {
			$table->uuid('id')->primary();
			$table->string('title')->nullable();
			$table->string('first_name');
			$table->string('middle_name')->nullable();
			$table->string('last_name')->nullable();
			$table->string('nickname')->nullable();
			$table->date('date_of_birth')->nullable();
			$table->mediumText('description')->nullable();
			$table->text('conditions')->nullable();
			$table->text('allergies')->nullable();
			$table->string('blood_type')->nullable();
			$table->string('image')->nullable();
			$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('identities');
    }
};
