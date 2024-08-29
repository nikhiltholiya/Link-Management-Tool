<?php

namespace App\Http\Requests;

use App\Rules\XSSPurifier;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTestimonialRequest extends FormRequest
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
            'name' => ['required', 'max:50', new XSSPurifier],
            'title' => ['required', 'max:50', new XSSPurifier],
            'testimonial' => ['required', 'max:180', new XSSPurifier],
            'thumbnail' => ['nullable', 'image', 'mimes:jpeg,png,jpg,svg', 'max:2048']
        ];
    }
}
