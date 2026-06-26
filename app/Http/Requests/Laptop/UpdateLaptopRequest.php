<?php

namespace App\Http\Requests\Laptop;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateLaptopRequest extends FormRequest
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
         if($this->has('kode')){
            $this->merge([
                'kode' => str($this->input('kode'))->trim()->squish()->upper()->value(),
            ]);
        }

        if($this->has('nama')){
            $this->merge([
                'nama' => str($this->input('nama'))->trim()->squish()->value(),
            ]);
        }

        if($this->has('spesifikasi')){
            $spesifikasi = $this->input('spesifikasi');
            $spesifikasi = $spesifikasi === null ? null : str($spesifikasi)->trim()->squish()->value();
            $this->merge([
                'spesifikasi' => $spesifikasi === '' ? null : $spesifikasi,
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
        $laptop = $this->route('laptop');
        return [
            'kode' => [
                'required', 
                'string', 
                'max:50',  
                Rule::unique('laptop', 'kode')->ignore($laptop?->id ?? $laptop)
            ],
            'nama' => ['required', 'string', 'max:128'],
            'spesifikasi' => ['nullable', 'string'],
        ];
    }
}
