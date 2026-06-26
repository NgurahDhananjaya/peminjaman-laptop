<?php

namespace App\Http\Controllers;

use App\Enums\LaptopStatus;
use App\Http\Requests\Laptop\CreateLaptopRequest;
use App\Http\Requests\Laptop\IndexLaptopRequest;
use App\Http\Requests\Laptop\UpdateLaptopRequest;
use App\Models\Laptop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaptopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexLaptopRequest $request)
    {
        $validated = $request->validated();

        $search = $validated['search'] ?? null;
        $status = $validated['status'] ?? null;
        $per_page = $validated['per_page'] ?? 10;

        $laptops = Laptop::query()
            ->when($search, function($query, $search){
                $query->where(function($subQuery) use ($search){
                    $subQuery->where('kode', 'ilike', "%{$search}%")
                        ->orWhere('nama', 'ilike', "%{$search}%");
                });
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate($per_page)
            ->withQueryString();

        return Inertia::render('Laptop/Index', [
            'data' => $laptops,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'per_page' => $per_page,
            ],
            'statuses' => LaptopStatus::values(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Laptop/Create', [
            'statuses' => LaptopStatus::values(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateLaptopRequest $request)
    {
        $data = $request->validated();
        $data['status'] ??= LaptopStatus::TERSEDIA->value;
        Laptop::create($data);

        return redirect()
            ->route('laptop.index')
            ->with('success', 'Laptop berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Laptop $laptop)
    {
        return Inertia::render('Laptop/Show', [
            'laptop' => $laptop,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Laptop $laptop)
    {
        return Inertia::render('Laptop/Edit', [
            'laptop' => $laptop,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLaptopRequest $request, Laptop $laptop)
    {
        $laptop->update($request->validated());
        return redirect()
            ->route('laptop.index')
            ->with('success', 'Laptop berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Laptop $laptop)
    {
        $laptop->delete();

        return redirect()
            ->route('laptop.index')
            ->with('success', 'Laptop berhasil dihapus.');
    }
}
