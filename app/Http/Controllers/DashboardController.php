<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the Dashboard
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request) {
        return Inertia::render('Dashboard');
    }
}
