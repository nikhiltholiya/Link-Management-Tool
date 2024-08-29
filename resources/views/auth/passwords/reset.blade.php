@extends('auth.layout')

@section('content')
<div class="container">
    <div class="row align-items-center justify-content-center" style="height: 100vh">
        <div class="col-lg-8">
            <div class="card">
                <div class="row">
                    <div class="col-lg-5">
                        <div class="auth-form-sidebar">
                            <img height="142px" width="142px" src="{{asset($app->logo)}}" alt="">
                            <h5 class="fw-bold mt-4">{{__('Bio Link')}}</h5>
                        </div>
                    </div>

                    <div class="col-lg-7">
                        <form class="auth-form" method="POST" action="{{ route('password.update') }}">
                            @csrf

                            <input type="hidden" name="token" value="{{ $token }}">
    
                            <div class="input-group mb-4">
                                <span class="input-group-text bg-white ps-3" id="basic-addon1">
                                    <i class="fa-regular fa-envelope"></i>
                                </span>
                                <input 
                                    id="email" 
                                    required 
                                    name="email" 
                                    type="email" 
                                    class="form-control px-2 border-start-0 @error('email') is-invalid @enderror" 
                                    value="{{ $email ?? old('email') }}" 
                                    autocomplete="email" 
                                    autofocus
                                >

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <div class="input-group mb-4">
                                <span class="input-group-text bg-white ps-3" id="basic-addon1">
                                    <i class="fa-regular fa-lock-keyhole"></i>
                                </span>
                                <input 
                                    required 
                                    id="password" 
                                    type="password" 
                                    name="password" 
                                    placeholder="Password" 
                                    autocomplete="new-password"
                                    class="form-control px-2 border-start-0 @error('password') is-invalid @enderror" 
                                >
                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
    
                            <div class="input-group mb-4">
                                <span class="input-group-text bg-white ps-3" id="basic-addon1">
                                    <i class="fa-regular fa-lock-keyhole"></i>
                                </span>
                                <input 
                                    type="password" 
                                    id="password-confirm" 
                                    name="password_confirmation" 
                                    placeholder="Confirm Password" 
                                    required autocomplete="new-password"
                                    class="form-control px-2 border-start-0" 
                                >
                            </div>
    
                            <div class="row mb-0">
                                <div class="col-lg-6 offset-lg-4">
                                    <button type="submit" class="btn btn-primary text-white">
                                        {{ __('Reset Password') }}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
