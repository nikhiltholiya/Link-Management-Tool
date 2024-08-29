@extends('auth.layout')

<?php
    $urlName = preg_replace("/\s+/", "", strtolower(request()->linkname));
    $iconClass = 'input-group-text bg-white ps-3 border';
    $inputClass = 'form-control px-2 border-start-0 rounded-end';

    $link = '';
    if ($linkname) {
        $link = $linkname;
    } else if (old('url_name')) {
        $link = old('url_name');
    }
    
?>

@section('content')
<div class="max-w-[800px] w-full rounded-lg shadow-card">
    <div class="grid grid-cols-12">
        <div class="col-span-12 lg:col-span-5 flex flex-col items-center justify-center bg-blue-50 rounded-s-lg">
            <img height="142px" width="142px" src="{{ asset($app->logo) }}" alt="">
            <p class="text-xl font-semibold mt-3">{{$app->title}}</p>
        </div>

        <div class="col-span-12 lg:col-span-7 p-8 lg:p-12">
            <form class="auth-form pb-0" method="POST" action="{{ route('register') }}">
                @csrf

                <p class="text-xl font-semibold mb-5 flex items-center">
                    <a class="text-gray-400" href="{{ route('login') }}">
                        {{__('Log in')}}
                    </a>
                    <span class="text-blue-500 text-base px-2">|</span>
                    <a href="{{ route('register') }}">
                        {{__('Register')}}
                    </a>
                </p>
                
                <div class="mb-4">
                    <div class=" relative">
                        <span class="absolute top-1/2 -translate-y-1/2 left-4">
                            @include('components.icons.user', ['class'=>'w-5 h-5 text-gray-500'])
                        </span>
                        <input
                            required 
                            id="name" 
                            name="name" 
                            type="name" 
                            value="{{ old('name') }}"
                            placeholder="full name"
                            class="pl-12 p-3 w-full rounded-lg border border-gray-200 focus:ring-0 focus:border-blue-500 focus:outline-0"
                        >
                    </div>
                    @error('name')
                        <span class="text-xs text-red-500" role="alert">
                            {{$message}}
                        </span>
                    @enderror
                </div>

                <div class="mb-4">
                    <div class=" relative">
                        <span class="absolute top-1/2 -translate-y-1/2 left-4">
                            @include('components.icons.link', ['class'=>'w-5 h-5 text-gray-500'])
                        </span>
                        <span class="absolute top-1/2 -translate-y-1/2 left-12">/</span>
                        <input
                            required 
                            id="bioLinkName" 
                            name="url_name" 
                            value="{{$link}}"
                            placeholder="urlname"
                            class="pl-14 p-3 w-full rounded-lg border border-gray-200 focus:ring-0 focus:border-blue-500 focus:outline-0"
                        >
                    </div>
                    @error('url_name')
                        <span class="text-xs text-red-500" role="alert">
                            {{$message}}
                        </span>
                    @enderror

                    <script>
                        document.getElementById("bioLinkName")
                        .addEventListener("change", function (item) {
                            let result = item.target.value.replace(/\s+/g, '').toLowerCase();
                            item.target.value = result;
                        });
                    </script>
                </div>

                <div class="mb-4">
                    <div class=" relative">
                        <span class="absolute top-1/2 -translate-y-1/2 left-4">
                            @include('components.icons.email', ['class'=>'w-5 h-5 text-gray-500'])
                        </span>
                        <input
                            required 
                            id="email" 
                            name="email" 
                            type="email" 
                            value="{{ old('email') }}"
                            placeholder="email address"
                            class="pl-12 p-3 w-full rounded-lg border border-gray-200 focus:ring-0 focus:border-blue-500 focus:outline-0"
                        >
                    </div>
                    @error('email')
                        <span class="text-xs text-red-500" role="alert">
                            {{$message}}
                        </span>
                    @enderror
                </div>

                <div class="mb-4">
                    <div class=" relative">
                        <span class="absolute top-1/2 -translate-y-1/2 left-4">
                            @include('components.icons.lock-keyhole', ['class'=>'w-5 h-5 text-gray-500'])
                        </span>
                        <input
                            required 
                            id="password" 
                            type="password" 
                            name="password" 
                            placeholder="password"
                            class="pl-12 p-3 w-full rounded-lg border border-gray-200 focus:ring-0 focus:border-blue-500 focus:outline-0"
                        >
                    </div>
                    @error('password')
                        <span class="text-xs text-red-500" role="alert">
                            {{$message}}
                        </span>
                    @enderror
                </div>

                <div class="mb-6">
                    <div class=" relative">
                        <span class="absolute top-1/2 -translate-y-1/2 left-4">
                            @include('components.icons.lock-keyhole', ['class'=>'w-5 h-5 text-gray-500'])
                        </span>
                        <input
                            required 
                            id="password" 
                            type="password" 
                            name="password_confirmation" 
                            placeholder="confirm password"
                            class="pl-12 p-3 w-full rounded-lg border border-gray-200 focus:ring-0 focus:border-blue-500 focus:outline-0"
                        >
                    </div>
                </div>

                <button 
                    type="submit" 
                    data-ripple-light="true"
                    class="py-2.5 px-5 w-full rounded-md bg-blue-500 font-medium text-white shadow-md shadow-blue-500/20 transition-all active:opacity-[0.85]"
                >
                    {{ __('Login') }}
                </button>
            </form>

            <form action="auth/google" method="GET" class="mt-3">
                @csrf

                @if ($google->active)
                    <button 
                        type="submit" 
                        class="py-2 px-5 w-full rounded-md font-medium border border-gray-200 transition-all active:opacity-[0.85] flex items-center justify-center"
                    >
                        <img src="{{asset('assets/icons/google.svg')}}" alt="" class="me-2">
                        {{__('Continue with Google')}}
                    </button>
                @endif
            </form>
        </div>
    </div>
</div>
@endsection
