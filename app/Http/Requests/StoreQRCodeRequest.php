<?php

namespace App\Http\Requests;

use App\Rules\XSSPurifier;
use Illuminate\Foundation\Http\FormRequest;

class StoreQRCodeRequest extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            'link_id' => 'nullable|exists:links,id',
            'project_id' => 'nullable|exists:projects,id',
            'qr_type' => 'required|string|max:255',
            'content' => ['required', 'string', 'max:50', new XSSPurifier],
            'img_data' => 'required',
        ];
    }
}
