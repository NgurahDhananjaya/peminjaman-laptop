<?php

namespace App\Http\Controllers;

use App\Enums\LaptopStatus;
use App\Models\Laptop;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'totalLaptop' => Laptop::count(),
            'laptopDipinjam' => Laptop::where('status', LaptopStatus::DIPINJAM->value)->count(),
            'laptopTersedia' => Laptop::where('status', LaptopStatus::TERSEDIA->value)->count(),
        ]);
    }
}
