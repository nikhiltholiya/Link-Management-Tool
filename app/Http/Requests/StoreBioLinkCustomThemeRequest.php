<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBioLinkCustomThemeRequest extends FormRequest
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
            'link_id' => 'required',
            'background' => 'required|string',
            'background_type' => 'required|string',
            'bg_color' => 'required|string',
            'text_color' => 'required|string',
            'btn_type' => 'required|string',
            'btn_transparent' => 'required|boolean',
            'btn_radius' => 'required|string',
            'btn_bg_color' => 'required|string',
            'btn_text_color' => 'required|string',
            'font_family' => 'required|string',
        ];
    }
}
