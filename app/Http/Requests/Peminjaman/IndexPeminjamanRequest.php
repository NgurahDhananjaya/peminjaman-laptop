<?php

namespace App\Http\Requests\Peminjaman;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class IndexPeminjamanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {

        if($this->filled('search')){
            $this->merge([
                'search' => str($this->input('search'))->trim()->squish()->value(),
            ]);
        }

        if($this->has('tanggal_pinjam_dari') && $this->input('tanggal_pinjam_dari') === ''){
            $this->merge([
                'tanggal_pinjam_dari' => null,
            ]);
        }

        if($this->has('tanggal_kembali_sampai') && $this->input('tanggal_kembali_sampai') === ''){
            $this->merge([
                'tanggal_kembali_sampai' => null,
            ]);
        }

    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:128'],
            'tanggal_pinjam_dari' => ['nullable', 'date'],
            'tanggal_kembali_sampai' => ['nullable', 'date', 'after_or_equal:tanggal_pinjam_dari'],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:100']
        ];
    }
}
