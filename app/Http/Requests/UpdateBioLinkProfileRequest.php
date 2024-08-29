<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBioLinkProfileRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'link_name' => 'string|max:50',
            'short_bio' => 'string|max:200',
            'thumbnail' => 'nullable|image|mimes:jpg,png,jpeg,svg|max:1024',
        ];
    }
}
