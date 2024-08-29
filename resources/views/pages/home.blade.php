<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ $app->title }} - {{__('Your Link Management in one place')}}</title>

        <!-- Styles -->
        <link rel="stylesheet" href="{{asset('style/aos.css')}}">
        <link rel="stylesheet" href="{{asset('style/swiper-slider.css')}}">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx'])

        <script src="{{asset('script/aos.js')}}" ></script>
        <script src="{{asset('script/swiper-slider.js')}}"></script>
        <script src="{{asset('script/smooth-scroll.js')}}"></script>
    </head>

    <body class="text-gray-800">
        <div id="preloader">
            <div id="loader"></div>
        </div>
        @include('components.home.navbar')

        <main class="overflow-x-hidden">
            @if (session('error'))
                @include('components.Toast', ['toastType' => 'error', 'message' => session('error')])
            @endif

            @include('components.home.Header')
            @include('components.home.Features')
            @include('components.home.CreateLink')
            @include('components.home.Blocks')
            @include('components.home.CreateQR')
            @include('components.home.Pricing')
            @include('components.home.Testimonials')
            @include('components.home.Footer')
        </main>

        <script>
            AOS.init({
                once: true,
            });
        </script>

        <script src="{{ asset('script/index.js') }}"></script>
        <script src="{{ asset('script/collapse.js') }}"></script>
        <script src="{{ asset('script/ripple.js') }}"></script>
        <script src="{{ asset('script/dialog.js') }}"></script>
        <script src="{{ asset('script/scripts-tabs.js') }}"></script>
    </body>
</html>
