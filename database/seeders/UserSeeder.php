<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Workspace;
use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'first_name' => 'Mateusz',
            'last_name' => 'Bulgajewski',
            'username' => 'matb',
            'email' => 'matbcode2@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('TdXb2LEWNt'),
        ]);

        DB::table('users')->insert([
            'first_name' => 'Rafał',
            'last_name' => 'Prymus',
            'username' => 'prymraf',
            'email' => 'prymraf2@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('lWEb8LszAC'),
        ]);
    }
}
