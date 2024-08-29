<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>App | Installation</title>

        <link href="{{ asset('installer/app.css') }}" rel="stylesheet">
        {{-- @vite(['resources/css/app.css', 'resources/js/app.js']) --}}
    </head>

    <body class="bg-gray-900 px-6 py-10">
        <div class="max-w-[750px] mx-auto w-full bg-white">
            <div class="p-6 md:p-10 bg-gray-100">
                <h5 class="text-3xl font-semibold text-center">
                    {{__('App Installation')}}
                </h5>
            </div>
            <div class="p-6 md:p-10">
                @yield('content')
            </div>
        </div>

        <script src="{{ asset('installer/app.js') }}"></script>
    </body>
</html>
