@php
    $laravelVersion = '8.0.2';
    $allValuesAreTrue = true;

    $requirements = [
        'php_version' => version_compare(PHP_VERSION, $laravelVersion, ">="),
        'openssl_enabled' => extension_loaded("openssl"),
        'pdo_enabled' => defined('PDO::ATTR_DRIVER_NAME'),
        'mbstring_enabled' => extension_loaded("mbstring"),
        'curl_enabled' => extension_loaded("curl"),
        'tokenizer_enabled' => extension_loaded("tokenizer"),
        'xml_enabled' => extension_loaded("xml"),
        'ctype_enabled' => extension_loaded("ctype"),
        'fileinfo_enabled' => extension_loaded("fileinfo"),
        'gd_enabled' => extension_loaded("gd"),
        'json_enabled' => extension_loaded("json"),
        'bcmath_enabled' => extension_loaded("bcmath"),
    ];

    foreach ($requirements as $item) {
        if (!$item) {
            $allValuesAreTrue = false;
            break;
        }
    }

    $statusList = [
        ['title' => "PHP >= $laravelVersion", 'key' => 'php_version'],
        ['title' => 'OpenSSL PHP Extension', 'key' => 'openssl_enabled'],
        ['title' => 'Gd PHP Extension', 'key' => 'pdo_enabled'],
        ['title' => 'fileinfo PHP Extension', 'key' => 'mbstring_enabled'],
        ['title' => 'Pdo PHP Extension', 'key' => 'curl_enabled'],
        ['title' => 'Mbstring PHP Extension', 'key' => 'tokenizer_enabled'],
        ['title' => 'Curl PHP Extension', 'key' => 'xml_enabled'],
        ['title' => 'Tokenizer PHP Extension', 'key' => 'ctype_enabled'],
        ['title' => 'XML PHP Extension', 'key' => 'fileinfo_enabled'],
        ['title' => 'CTYPE PHP Extension', 'key' => 'gd_enabled'],
        ['title' => 'JSON PHP Extension', 'key' => 'json_enabled'],
        ['title' => 'BCmath PHP Extension', 'key' => 'bcmath_enabled'],
    ];
@endphp

@extends('installer.main')
@section('content')
    @include('installer.components.navbar', ['step1' => 'active'])

    <div class="mb-12">   
        @if (!$allValuesAreTrue)
            <p class="bg-red-100 text-red-500">
                {{__("Your server doesn't meet the following requirements")}}
            </p> 
        @endif
        <div class="border border-gray-300">
            @foreach ($statusList as $item)
                <div class="flex justify-between items-center px-6 py-4 odd:bg-gray-100 text-gray-500">
                    {{$item['title']}}

                    @if ($item['key'] === 'php_version')
                        <div class="flex items-center">
                            <span class="mr-2">
                                <?php echo PHP_VERSION; ?>
                            </span>
                            @if ($requirements[$item['key']])
                                @include('installer.components.check', ['class' => 'text-green-500'])
                            @else
                                @include('installer.components.wrong', ['class' => 'text-red-500'])
                            @endif
                        </div>
                    @else
                        @if ($requirements['openssl_enabled'])
                            @include('installer.components.check', ['class' => 'text-green-500'])
                        @else
                            @include('installer.components.wrong', ['class' => 'text-red-500'])
                        @endif
                    @endif
                </div>  
            @endforeach
        </div>
    </div>

    @if ($allValuesAreTrue)
        <div class="flex justify-end">
            <a id="next" href="/setup/step-1">
                <button class="button">
                    {{__('Next Step')}}
                </button>
            </a>
        </div>
    @endif
@endsection