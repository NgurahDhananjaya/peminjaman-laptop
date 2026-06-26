<?php

namespace App\Enums;

enum LaptopStatus : string
{
    case TERSEDIA = 'Tersedia';
    case DIPINJAM = 'Dipinjam';

    public static function values(): array{
        return array_column(self::cases(), 'value');
    }
}
