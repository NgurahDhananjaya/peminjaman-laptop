<?php

namespace App\Http\Controllers;

use App\Enums\LaptopStatus;
use App\Http\Requests\Laptop\IndexLaptopRequest;
use App\Http\Requests\Peminjaman\CreatePeminjamanRequest;
use App\Http\Requests\Peminjaman\IndexPeminjamanRequest;
use App\Http\Requests\Peminjaman\KembalikanPeminjamanRequest;
use App\Models\Laptop;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PeminjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexPeminjamanRequest $request)
    {
        $validated = $request->validated();

        $search = $validated['search'] ?? null;
        $tanggal_pinjam_dari = $validated['tanggal_pinjam_dari'] ?? null;
        $tanggal_kembali_sampai = $validated['tanggal_kembali_sampai'] ?? null;
        $per_page = $validated['per_page'] ?? 10;

        $peminjaman = Peminjaman::query()
            ->with('laptop')
            ->when($search, function ($query, $search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery->where('nama_peminjam', 'ilike', "%{$search}%")
                        ->orWhereHas('laptop', function ($laptopQuery) use ($search) {
                            $laptopQuery->where('kode', 'ilike', "%{$search}%")
                                ->orWhere('nama', 'ilike', "%{$search}%");
                        });
                });
            })
            ->when($tanggal_pinjam_dari, function ($query, $tanggal_pinjam_dari) {
                $query->whereDate('tanggal_pinjam', '>=', $tanggal_pinjam_dari);
            })
            ->when($tanggal_kembali_sampai, function ($query, $tanggal_kembali_sampai) {
                $query->whereDate('tanggal_kembali', '<=', $tanggal_kembali_sampai);
            })
            ->latest()
            ->paginate($per_page)
            ->withQueryString()
            ->through(function ($item) {
                return [
                    'id' => $item->id,
                    'nama_peminjam' => $item->nama_peminjam,
                    'tanggal_pinjam' => $item->tanggal_pinjam,
                    'tanggal_kembali' => $item->tanggal_kembali,
                    'status' => $item->tanggal_kembali ? 'Sudah Dikembalikan' : 'Sedang Dipinjam',
                    'laptop' => [
                        'id' => $item->laptop?->id,
                        'kode' => $item->laptop?->kode,
                        'nama' => $item->laptop?->nama,
                    ],
                ];
            });

        return Inertia::render('Peminjaman/Index', [
            'data' => $peminjaman,
            'filters' => [
                'search' => $search,
                'tanggal_pinjam_dari' => $tanggal_pinjam_dari,
                'tanggal_kembali_sampai' => $tanggal_kembali_sampai,
                'per_page' => $per_page,
            ],
        ]);
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(IndexLaptopRequest $request)
    {

        $validated = $request->validated();

        $search = $validated['search'] ?? null;
        $per_page = $validated['per_page'] ?? 10;

        $laptops = Laptop::query()
            ->where('status', LaptopStatus::TERSEDIA->value)
            ->when($search, function($query, $search){
                $query->where(function($subQuery) use ($search){
                    $subQuery->where('kode', 'ilike', "%{$search}%")
                        ->orWhere('nama', 'ilike', "%{$search}%");
                });
            })
            ->latest()
            ->paginate($per_page)
            ->withQueryString();

        return Inertia::render('Peminjaman/Create', [
            'laptops' => $laptops,
            'filters' => [
                'search' => $search,
                'per_page' => $per_page,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreatePeminjamanRequest $request)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data) {

            $laptop = Laptop::where('id', $data['laptop_id'])
                ->lockForUpdate()
                ->firstOrFail();

            if ($laptop->status !== LaptopStatus::TERSEDIA) {
                abort(422, 'Laptop sedang tidak tersedia.');
            }

            Peminjaman::create([
                'laptop_id' => $data['laptop_id'],
                'nama_peminjam' => $data['nama_peminjam'],
                'tanggal_pinjam' => $data['tanggal_pinjam'] ?? now()->toDateString(),
                'tanggal_kembali' => null,
            ]);

            $laptop->update([
                'status' => LaptopStatus::DIPINJAM->value,
            ]);
        });

        return redirect()
            ->route('peminjaman.index')
            ->with('success', 'Peminjaman berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Peminjaman $peminjaman)
    {
        $peminjaman->load('laptop');

        return Inertia::render('Peminjaman/Show', [
            'peminjaman' => $peminjaman,
        ]);
    }

    public function kembalikan(KembalikanPeminjamanRequest $request, Peminjaman $peminjaman)
    {
        $request->validated();
        
        DB::transaction(function () use ($peminjaman) {
            $peminjaman->update([
                'tanggal_kembali' => now()->toDateString(),
            ]);

            $peminjaman->laptop->update([
                'status' => LaptopStatus::TERSEDIA->value,
            ]);
        });

        return redirect()
            ->route('peminjaman.index')
            ->with('success', 'Laptop berhasil dikembalikan.');
    }

}
