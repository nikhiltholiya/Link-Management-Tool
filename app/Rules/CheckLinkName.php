<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CheckLinkName implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $check1 = strpos($value, 'http') !== false;
        $check2 = strpos($value, 'https') !== false;

        $check3 = '';
        $chars = str_split($value);
        foreach ($chars as $ch) {
            if ($ch >= 'a' && $ch <= 'z' || $ch >= 'A' && $ch <= 'Z' || $ch >= '0' && $ch <= '9') {
                $check3 = $check3 . $ch;
            }
        }

        if (!$check1 && !$check2 && $check3 == $value) {
            return;
        } else {
            $fail('The url name should be characters or numbers without space.');
        }
    }
}
