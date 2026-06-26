<?php

namespace App\Http\Requests\Peminjaman;

use App\Enums\LaptopStatus;
use App\Models\Laptop;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreatePeminjamanRequest extends FormRequest
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

        if($this->has('laptop_id')){
            $this->merge([
                'laptop_id' => (int) $this->input('laptop_id'),
            ]);
        }
        if($this->has('nama_peminjam')){
            $this->merge([
                'nama_peminjam' => str($this->input('nama_peminjam'))->trim()->squish()->value(),
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
            'laptop_id' => [
                'required', 
                'integer', 
                Rule::exists('laptop', 'id')
                    ->where('status', LaptopStatus::TERSEDIA->value)],
            'nama_peminjam' => [
                'required',
                'string',
                'max:128',
            ],
            'tanggal_pinjam' => ['nullable', 'date']
        ];
    }
}
