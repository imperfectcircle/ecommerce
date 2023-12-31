<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update category');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $category = $this->route('category');
        return [
            'name' => [
            'required',
            'string',
            'max:255',
            Rule::unique('categories', 'name')->ignore($category->id),
        ],
            'description' => 'sometimes|nullable|string',
            'parent_id' => 'sometimes|nullable|integer|exists:categories,id',
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
