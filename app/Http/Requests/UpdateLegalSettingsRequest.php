<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class UpdateLegalSettingsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'refund_policy' => 'nullable|string',
            'privacy_policy' => 'nullable|string',
            'terms_of_service' => 'nullable|string',
        ];
    }

    public function withValidator(Validator $validator) {
        $validator->after(function ($validator) {
            $validator->setData(
                collect($validator->getData())->filter(fn ($value) => $value)->all()
            );
        }); 
    }
}
