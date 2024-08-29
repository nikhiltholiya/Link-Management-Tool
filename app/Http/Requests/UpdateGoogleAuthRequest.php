<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGoogleAuthRequest extends FormRequest
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
            'active' => 'required|boolean', // Replace 'yes' and 'no' with the valid values for 'active'
            'client_id' => 'required|string|max:255',
            'client_secret' => 'required|string|max:255',
            'redirect_url' => 'required|url|max:255',
        ];
    }
}
