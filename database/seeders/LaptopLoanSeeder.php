<?php

namespace Database\Seeders;

use App\Enums\LaptopStatus;
use App\Models\Laptop;
use App\Models\Peminjaman;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LaptopLoanSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function () {
            Peminjaman::query()->delete();
            Laptop::query()->delete();

            $laptops = collect([
                [
                    'kode' => 'LT-001',
                    'nama' => 'MacBook Air M1',
                    'spesifikasi' => 'Apple M1, 8GB RAM, 256GB SSD, 13-inch',
                    'status' => LaptopStatus::DIPINJAM->value,
                ],
                [
                    'kode' => 'LT-002',
                    'nama' => 'MacBook Pro M2',
                    'spesifikasi' => 'Apple M2, 16GB RAM, 512GB SSD, 13-inch',
                    'status' => LaptopStatus::DIPINJAM->value,
                ],
                [
                    'kode' => 'LT-003',
                    'nama' => 'Dell XPS 13',
                    'spesifikasi' => 'Intel Core i7, 16GB RAM, 512GB SSD, 13-inch',
                    'status' => LaptopStatus::DIPINJAM->value,
                ],
                [
                    'kode' => 'LT-004',
                    'nama' => 'Lenovo ThinkPad X1 Carbon',
                    'spesifikasi' => 'Intel Core i7, 16GB RAM, 1TB SSD, 14-inch',
                    'status' => LaptopStatus::DIPINJAM->value,
                ],
                [
                    'kode' => 'LT-005',
                    'nama' => 'ASUS ZenBook 14',
                    'spesifikasi' => 'AMD Ryzen 7, 16GB RAM, 512GB SSD, 14-inch',
                    'status' => LaptopStatus::TERSEDIA->value,
                ],
                [
                    'kode' => 'LT-006',
                    'nama' => 'HP Pavilion 14',
                    'spesifikasi' => 'Intel Core i5, 8GB RAM, 512GB SSD, 14-inch',
                    'status' => LaptopStatus::TERSEDIA->value,
                ],
                [
                    'kode' => 'LT-007',
                    'nama' => 'Acer Swift 3',
                    'spesifikasi' => 'AMD Ryzen 5, 8GB RAM, 512GB SSD, 14-inch',
                    'status' => LaptopStatus::TERSEDIA->value,
                ],
                [
                    'kode' => 'LT-008',
                    'nama' => 'Lenovo IdeaPad Slim 5',
                    'spesifikasi' => 'Intel Core i5, 16GB RAM, 512GB SSD, 14-inch',
                    'status' => LaptopStatus::TERSEDIA->value,
                ],
                [
                    'kode' => 'LT-009',
                    'nama' => 'ASUS VivoBook 15',
                    'spesifikasi' => 'Intel Core i5, 8GB RAM, 512GB SSD, 15-inch',
                    'status' => LaptopStatus::TERSEDIA->value,
                ],
                [
                    'kode' => 'LT-010',
                    'nama' => 'Dell Inspiron 14',
                    'spesifikasi' => 'Intel Core i5, 8GB RAM, 256GB SSD, 14-inch',
                    'status' => LaptopStatus::TERSEDIA->value,
                ],
                [
                    'kode' => 'LT-011',
                    'nama' => 'HP Envy x360',
                    'spesifikasi' => 'AMD Ryzen 7, 16GB RAM, 512GB SSD, Touchscreen',
                    'status' => LaptopStatus::TERSEDIA->value,
                ],
                [
                    'kode' => 'LT-012',
                    'nama' => 'Acer Aspire 5',
                    'spesifikasi' => 'Intel Core i5, 8GB RAM, 512GB SSD, 15-inch',
                    'status' => LaptopStatus::TERSEDIA->value,
                ],
                [
                    'kode' => 'LT-013',
                    'nama' => 'Microsoft Surface Laptop 4',
                    'spesifikasi' => 'Intel Core i5, 8GB RAM, 512GB SSD, 13.5-inch',
                    'status' => LaptopStatus::TERSEDIA->value,
                ],
                [
                    'kode' => 'LT-014',
                    'nama' => 'MSI Modern 14',
                    'spesifikasi' => 'Intel Core i7, 16GB RAM, 512GB SSD, 14-inch',
                    'status' => LaptopStatus::TERSEDIA->value,
                ],
                [
                    'kode' => 'LT-015',
                    'nama' => 'Lenovo Yoga Slim 7',
                    'spesifikasi' => 'AMD Ryzen 7, 16GB RAM, 1TB SSD, 14-inch',
                    'status' => LaptopStatus::TERSEDIA->value,
                ],
            ])->map(fn ($data) => Laptop::create($data));

            Peminjaman::create([
                'laptop_id' => $laptops[0]->id,
                'nama_peminjam' => 'Ayu Triananda',
                'tanggal_pinjam' => now()->subDays(7)->toDateString(),
                'tanggal_kembali' => null,
            ]);

            Peminjaman::create([
                'laptop_id' => $laptops[1]->id,
                'nama_peminjam' => 'Budi Santoso',
                'tanggal_pinjam' => now()->subDays(5)->toDateString(),
                'tanggal_kembali' => null,
            ]);

            Peminjaman::create([
                'laptop_id' => $laptops[2]->id,
                'nama_peminjam' => 'Citra Dewi',
                'tanggal_pinjam' => now()->subDays(4)->toDateString(),
                'tanggal_kembali' => null,
            ]);

            Peminjaman::create([
                'laptop_id' => $laptops[3]->id,
                'nama_peminjam' => 'Dimas Pratama',
                'tanggal_pinjam' => now()->subDays(2)->toDateString(),
                'tanggal_kembali' => null,
            ]);

            Peminjaman::create([
                'laptop_id' => $laptops[4]->id,
                'nama_peminjam' => 'Eka Putri',
                'tanggal_pinjam' => now()->subDays(10)->toDateString(),
                'tanggal_kembali' => now()->subDays(3)->toDateString(),
            ]);
        });
    }
}