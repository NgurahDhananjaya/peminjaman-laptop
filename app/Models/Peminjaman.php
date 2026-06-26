<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Peminjaman extends Model
{
    protected $table = 'peminjaman';
    
    protected $fillable = [
        'laptop_id',
        'nama_peminjam',
        'tanggal_pinjam',
        'tanggal_kembali',
    ];

    protected $casts = [
        'tanggal_pinjam' => 'date',
        'tanggal_kembali' => 'date',
    ];

    public function laptop(): BelongsTo {
        return $this->belongsTo(Laptop::class, 'laptop_id');
    }
}
