<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create category');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:categories|max:255',
            'description' => 'nullable|string',
            'parent_id' => 'sometimes|nullable|integer|exists:categories,id'
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
            'parent_id.integer' => 'Il campo Categoria Padre deve essere di tipo numerico.',
            'parent_id.exists' => 'Il campo Categoria Padre inserito non esiste nel database.',
        ];
    }
}
