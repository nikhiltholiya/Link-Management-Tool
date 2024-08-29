<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBioLinkBlockRequest extends FormRequest
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
            'link_id' => 'required|exists:links,id',
            'item_type' => 'required|string|max:255',
            'item_sub_type' => 'nullable|string|max:255',
            'item_title' => 'required|string|max:255',
            'item_link' => 'nullable|string|max:255',
            'item_icon' => 'required|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,svg|max:1024',
        ];
    }
}
