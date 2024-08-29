<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $app->title }} - {{__('Your Link Management in one place')}}</title>

    <!-- Styles -->
    <link rel="stylesheet" href="{{asset('styles/aos.css')}}">
    <link rel="stylesheet" href="{{asset('styles/swiper-slider.css')}}">
    
    <script src="{{asset('script/aos.js')}}" ></script>
    <script src="{{asset('script/swiper-slider.js')}}"></script>
    <script src="{{asset('script/smooth-scroll.js')}}"></script>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
</head>

<?php
    $user = auth()->user();
    $SA = false;
    if ($user) {
        $roleSA = $user->hasRole('SUPER-ADMIN');
        $editHome = request()->edithome;
        $SA = $roleSA && $editHome ? true : false;
    }
?>

<body class="text-gray-800">
    <div id="preloader">
        <div id="loader"></div>
    </div>
    @include('components.home.navbar')

    <main style="overflow-x: hidden !important;">
        @yield('content')
    </main>

    <script>
        AOS.init({
            once: true,
        });
    </script>

    <script src="{{ asset('script/index.js') }}"></script>
    <script src="{{ asset('script/collapse.js') }}"></script>
    <script src="{{ asset('script/ripple.js') }}"></script>
    <script src="{{ asset('script/scripts-tabs.js') }}"></script>
</body>

</html>
