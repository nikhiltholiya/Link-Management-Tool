<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePricingPlanRequest extends FormRequest
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
            'name' => 'required|max:50',
            'description' => 'required|max:100',
            'monthly_price' => 'required',
            'yearly_price' => 'required',
            'currency' => 'required',
            'status' => 'required',
            'biolinks' => 'required',
            'biolink_blocks' => 'required',
            'shortlinks' => 'required',
            'projects' => 'required',
            'qrcodes' => 'required',
            'themes' => 'required',
            'custom_theme' => 'required',
            'support' => 'required',
        ];
    }
}
