<?php

namespace App\Http\Requests;

use App\Rules\CheckLinkName;
use App\Rules\XSSPurifier;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBioLinkRequest extends FormRequest
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
            'new_url' => 'required|boolean',
            'link_name' => ['required', 'string', 'min:5', 'max:50', new XSSPurifier],
            'url_name' => ['exclude_unless:new_url,true', 'required', 'string', 'unique:links', 'min:5', 'max:50', new XSSPurifier, new CheckLinkName]
        ];
    }
}
