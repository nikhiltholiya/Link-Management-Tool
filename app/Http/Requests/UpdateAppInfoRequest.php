<?php

namespace App\Http\Requests;

use App\Rules\XSSPurifier;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAppInfoRequest extends FormRequest
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
            'title' => ['required', 'max:50', new XSSPurifier],
            'copyright' => ['required', 'max:100', new XSSPurifier],
            'description' => ['required', 'max:200', new XSSPurifier],
            'logo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,svg', 'max:2048'],
        ];
    }
}
