<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBrandRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update brand', $this->route('brand'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('brands')->ignore($this->route('brand')->id),
            ],
            'description' => 'sometimes|nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'name.requires' => 'Il campo Nome è richiesto.',
            'name.string' => 'Il campo Nome deve essere di tipo testo.',
            'name.unique' => 'Esiste già una categoria con questo nome.',
            'name.max' => 'Il campo Nome ha una lunghezza massima di 255 caratteri.',
            'description.string' => 'Il campo Descrizione deve essere di tipo testo.',
        ];
    }
}
