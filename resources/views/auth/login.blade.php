@extends('auth.layout')
@section('content')
    <div class="max-w-[800px] w-full rounded-lg shadow-card">
        <div class="grid grid-cols-12">
            <div class="col-span-12 lg:col-span-5 flex flex-col items-center justify-center bg-blue-50 rounded-s-lg">
                <img height="142px" width="142px" src="{{ asset($app->logo) }}" alt="">
                <p class="text-xl font-semibold mt-3">{{$app->title}}</p>
            </div>

            <div class="col-span-12 lg:col-span-7 p-8 lg:p-12">
                <form 
                    method="POST" 
                    class="auth-form pb-0" 
                    action="{{ route('login') }}"
                >
                    @csrf

                    <p class="text-xl font-semibold mb-5 flex items-center">
                        <a href="{{ route('login') }}">
                            {{__('Log in')}}
                        </a>
                        <span class="text-blue-500 text-base px-2">|</span>
                        <a class="text-gray-400" href="{{ route('register') }}">
                            {{__('Register')}}
                        </a>
                    </p>

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
                                placeholder="Email Address"
                                class="pl-12 p-3 w-full rounded-lg border border-gray-200 focus:ring-0 focus:border-blue-500 focus:outline-0"
                            >
                        </div>
                        @error('email')
                            <span class="text-xs text-red-500" role="alert">
                                {{$message}}
                            </span>
                        @enderror
                    </div>

                    <div class="mb-2">
                        <div class=" relative">
                            <span class="absolute top-1/2 -translate-y-1/2 left-4">
                                @include('components.icons.lock-keyhole', ['class'=>'w-5 h-5 text-gray-500'])
                            </span>
                            <input
                                required 
                                id="password" 
                                type="password" 
                                name="password" 
                                placeholder="Password"
                                class="pl-12 p-3 w-full rounded-lg border border-gray-200 focus:ring-0 focus:border-blue-500 focus:outline-0"
                            >
                        </div>
                        @error('password')
                            <span class="text-xs text-red-500" role="alert">
                                {{$message}}
                            </span>
                        @enderror
                    </div>

                    <div class="flex flex-wrap md:flex-nowrap items-center justify-between mt-5 mb-6 text-sm gap-2">
                        <div class="flex items-center">
                            <input 
                                id="remember"
                                name="remember" 
                                type="checkbox" 
                                class="rounded focus:outline-0 focus:ring-white w-3.5 h-3.5 mr-2" 
                                {{old('remember') ? 'checked' : ''}}
                            >
                            <label for="remember">
                                {{ __('Remember Me') }}
                            </label>
                        </div>

                        @if (Route::has('password.request'))
                            <a class="text-red-500" href="{{ route('password.request') }}">
                                {{ __('Forgot Your Password?') }}
                            </a>
                        @endif
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
