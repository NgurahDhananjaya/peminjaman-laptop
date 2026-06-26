<?php

namespace App\Models;

use App\Enums\LaptopStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Laptop extends Model
{
    protected $table = 'laptop';

    protected $fillable = [
        'kode',
        'nama',
        'spesifikasi',
        'status',
    ];

    protected $casts = [
        'status' => LaptopStatus::class,
    ];

    public function peminjaman(): HasMany{
        return $this->hasMany(Peminjaman::class, 'laptop_id');
    }
}
