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
                        <form class="auth-form" method="POST" action="{{ route('password.email') }}">
                            @csrf

                            @if(session()->has('status'))
                                <div class="alert alert-primary" role="alert">
                                    {{__('Password reset link sent your mail')}}
                                </div>
                            @endif

                            <h5 class="mb-4">{{__('Reset Password')}}</h5>

                            <div class="input-group mb-4">
                                <span class="input-group-text bg-white ps-3" id="basic-addon1">
                                    <i class="fa-regular fa-envelope"></i>
                                </span>
                                <input 
                                    required 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    autocomplete="email" 
                                    value="{{ old('email') }}" 
                                    placeholder="Email Address"
                                    class="form-control px-2 border-start-0 @error('email') is-invalid @enderror" 
                                >
                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
    
                            <button type="submit" class="btn btn-primary form-control text-white">
                                {{__('Send Password Reset Link')}}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
