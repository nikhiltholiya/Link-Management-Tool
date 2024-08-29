<?php

namespace App\Http\Requests;

use App\Rules\CheckLinkName;
use App\Rules\XSSPurifier;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreShortLinkRequest extends FormRequest
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
            'link_name' => ['required', 'string', 'min:5', 'max:255', new XSSPurifier],
            'external_url' => ['required', 'min:10', 'max:255', 'url', new XSSPurifier],
            'link_slug' => ['nullable', 'string', 'min:8', 'max:50', 'unique:links,url_name', new XSSPurifier, new CheckLinkName],
        ];
    }
}
