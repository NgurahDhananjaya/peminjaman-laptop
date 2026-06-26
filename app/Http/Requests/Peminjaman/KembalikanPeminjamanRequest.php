<?php

namespace App\Http\Requests\Peminjaman;

use App\Models\Peminjaman;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class KembalikanPeminjamanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation()
    {
        $peminjaman = $this->route('peminjaman');
        $peminjamanId = $peminjaman instanceof Peminjaman
            ? $peminjaman->id
            : $peminjaman;

        $this->merge([
            'id' => (int) $peminjamanId,
        ]);
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => [
                'required',
                'integer',
                Rule::exists('peminjaman', 'id')
                    ->whereNull('tanggal_kembali')],
        ];
    }
}
