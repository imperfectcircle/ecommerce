<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create roles');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:roles,name',
            'guard' => 'sometimes|nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Il campo Nome è richiesto.',
            'name.string' => 'Il campo Nome deve essere di tipo testo.',
            'name.unique' => 'Il Ruolo inserito esiste già.',
            'guard.string' => 'Il campo Guard deve essere di tipo testo',
        ];
    }
}
