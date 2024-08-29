<?php

namespace App\Rules;

use Closure;
use HTMLPurifier;
use Illuminate\Contracts\Validation\ValidationRule;

class XSSPurifier implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $purifier = new HTMLPurifier();
        $purified = $purifier->purify($value);
        $validate = strip_tags($purified);

        if ($purified !== $value) {
            $fail('The :attribute contains invalid characters.');
            return;
        }

        if ($validate !== $value) {
            $fail('The :attribute cannot contain any HTML tags.');
        }
    }
}
