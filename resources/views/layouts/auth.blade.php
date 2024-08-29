<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        {{-- vites --}}
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
    </head>

    <body>
        <main class="min-h-screen flex justify-center items-center p-6 bg-[#F5F5F5]">
            @yield('content')
        </main>
    </body>
</html>
