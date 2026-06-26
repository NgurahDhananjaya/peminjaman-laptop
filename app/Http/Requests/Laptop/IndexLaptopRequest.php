<?php

namespace App\Http\Requests\Laptop;

use App\Enums\LaptopStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class IndexLaptopRequest extends FormRequest
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

        if($this->filled('status')){
            $this->merge([
                'status' => str($this->input('status'))->trim()->studly()->value(),
            ]);
        }
    }

    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:128'],
            'status' => ['nullable', 'string', Rule::in(LaptopStatus::values())],
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:100'],
        ];
    }
}
