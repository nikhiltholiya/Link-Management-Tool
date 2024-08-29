@extends('layouts.auth')

@php
    $errorMessage;
    if ($errors->has('email')) {
        $errorMessage = $errors->first('email');
    }else if(session('error')){
        $errorMessage = session('error');
    }else {
        $errorMessage = false;
    }
@endphp 

@section('content')
    <div class="rounded-xl bg-white shadow-card max-w-[800px] w-full">
        <div class="px-7 pt-7 pb-4 border-b border-b-gray-200">
            <p class="text18 font-bold text-gray-900">Forget Password</p>
        </div>

        <form class="p-7" method="POST" action="{{ route('password.email') }}">
            @csrf

            @include('components.input', [
                'id' => '',
                'type' => 'email',
                'name' => 'email',
                'value' => '',
                'label' => 'Email Address',
                'fullWidth' => true,
                'required' => true,
                'flexLabel' => true,
                'disabled' => false,
                'error' => $errorMessage,
                'className' => $errorMessage ? '!border-red-500' : '',
                'placeholder' => 'Enter your email address',
            ])

            <div class="mt-7 md:pl-[164px]">
                @if(session('success'))
                    <p class="text-success-500 text-sm mb-6">
                        A new password reset link has been sent to the email address you provided.
                    </p>
                @endif

                <button type="submit" class="bg-blue-500 hover:bg-blue-500 active:bg-blue-500 font-medium capitalize rounded-md text14 text-white px-4 h-10">
                    {{ __('Get Password Reset Link') }}
                </button>
            </div>
        </form>
    </div>
@endsection
