<?php

use App\Http\Controllers\LaptopController;
use App\Http\Controllers\PeminjamanController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::get('/dashboard', function () {
    return redirect()->route('laptop.index');
})->name('dashboard');

Route::resource('laptop', LaptopController::class);
Route::resource('peminjaman', PeminjamanController::class);

Route::patch('/peminjaman/{peminjaman}/kembalikan', [PeminjamanController::class, 'kembalikan'])
    ->name('peminjaman.kembalikan');

require __DIR__.'/auth.php';
