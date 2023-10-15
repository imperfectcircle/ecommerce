<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOptionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Option::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'option.name' => 'required|string',
            'option.values' => 'required|array|min:1',
            'option.values.*' => 'sometimes|nullable|string|distinct:ignore_case|max:255',
        ];
    }

    protected function passedValidation()
    {
        $this->replace([
            'name' => $this->option['name'],
            'values' => collect($this->option['values'])
                ->filter()
                ->map(fn($value) => ['value' => $value])
                ->toArray(),
        ]);
    }

    public function messages()
    {
        return [
            'option.name.required' => 'Il nome dell\'opzione è richiesto.',
            'option.name.string' => 'Il nome dell\'opzione deve essere di tipo testo.',
            'option.values' => 'Inserisci un valore.',
            'option.values.*.string' => 'Il valore dell\'opzione deve essere di tipo testo.',
        ];
    }
}
