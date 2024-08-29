@php
    $lengthOver = false;
    if ($maxLength && $value && strlen($value) >= $maxLength) {
        $lengthOver = true;
    }
@endphp

<div class="relative flex flex-col items-start {{ $flexLabel ? 'md:flex-row md:items-center' : '' }} {{ $fullWidth ? 'w-full' : '' }}">
    @if ($label)
        @if ($flexLabel)
            <small class="max-w-[164px] w-full mb-1 whitespace-nowrap flex items-center font-medium text-gray-500">
                <span class="mr-1">{{ $label }}</span>
                @if ($required)
                    <span class="block text-red-500">*</span>
                @endif
            </small>
        @else
            <small class="w-full mb-1 whitespace-nowrap flex items-center font-medium text-gray-500">
                <span class="mr-1">{{ $label }}</span>
                @if ($required)
                    <span class="block text-red-500">*</span>
                @endif
            </small>
        @endif
    @endif

    @if ($maxLength)
        <small class="absolute top-0 right-0 w-full text-end">
            {{ $value ? strlen($value) : 0 }}/{{ $maxLength }}
        </small>
    @endif

    <textarea
        name="{{ $name }}"
        rows="{{ $rows ?? 3 }}"
        cols="{{ $cols ?? 10 }}"
        maxlength="{{$maxLength}}"
        class="rounded-md w-full text-sm px-2.5 py-2 focus:ring-0 border-none outline outline-1
            {{ $lengthOver ? 'outline-red-500 focus:outline-red-500' : 'outline-gray-200 focus:outline-blue-500' }}
            {{ $fullWidth ? 'w-full' : '' }}
        placeholder="{{ $placeholder }}"
        {{ $required ? 'required' : '' }}
    >{{ $value }}</textarea>

    @if ($lengthOver)
        <p class="text-sm text-red-500 mt-1">
            Max length should be less or equal {{ $maxLength }}
        </p>
    @endif
    @if ($error)
        <p class="text-sm text-red-500 mt-1">{{$error}}</p>
    @endif
</div>
