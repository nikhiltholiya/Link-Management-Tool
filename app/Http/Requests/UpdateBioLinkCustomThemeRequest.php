<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBioLinkCustomThemeRequest extends FormRequest
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
            'type' => 'required|string',
            'link_id' => 'required',
            'bg_color' => 'nullable|string',
            'bg_image' => 'nullable|image|mimes:jpg,png,jpeg,svg|max:1024',
            'text_color' => 'nullable|string',
            'btn_type' => 'nullable|string',
            'btn_transparent' => 'nullable|boolean',
            'btn_radius' => 'nullable|string',
            'btn_bg_color' => 'nullable|string',
            'btn_text_color' => 'nullable|string',
            'font_family' => 'nullable|string',
        ];
    }
}
