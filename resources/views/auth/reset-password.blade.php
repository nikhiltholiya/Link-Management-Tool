@extends('layouts.auth')

@section('content')
    <div class="rounded-xl bg-white shadow-card max-w-[800px] w-full">
        <div class="px-7 pt-7 pb-4 border-b border-b-gray-200">
            <p class="text18 font-bold text-gray-900">Reset Your Password</p>
        </div>

        <form class="p-7" method="POST" action="{{route("password.store")}}">
            @csrf

            <input type="hidden" name="token" value="{{$token}}">

            @include('components.input', [
                'id' => 'reset-email',
                'type' => 'email',
                'name' => 'email',
                'value' => $email,
                'label' => 'Email Address',
                'fullWidth' => true,
                'required' => true,
                'flexLabel' => true,
                'disabled' => false,
                'error' => $errors->first('email'),
                'className' => $errors->first('email') ? '!border-red-500' : '',
                'placeholder' => 'Enter your email address',
            ])

            <div class="py-6">
                @include('components.input', [
                    'id' => '',
                    'type' => 'password',
                    'name' => 'password',
                    'value' => '',
                    'label' => 'New password',
                    'fullWidth' => true,
                    'required' => true,
                    'flexLabel' => true,
                    'disabled' => false,
                    'error' => $errors->first('password'),
                    'className' => $errors->first('password') ? '!border-red-500' : '',
                    'placeholder' => 'Enter your new password',
                ])
            </div>

            @include('components.input', [
                'id' => '',
                'type' => 'password',
                'name' => 'password_confirmation',
                'value' => '',
                'label' => 'Confirm password',
                'fullWidth' => true,
                'required' => true,
                'flexLabel' => true,
                'disabled' => false,
                'error' => '',
                'className' => '',
                'placeholder' => 'Confirm your new password',
            ])

            <div class="mt-7 md:pl-[164px]">
                <button type="submit" class="bg-blue-500 hover:bg-blue-500 active:bg-blue-500 font-medium capitalize rounded-md text14 text-white px-4 h-10">
                    {{ __('Save Changes') }}
                </button>
            </div>
        </form>
    </div>

    <script>
        const resetEmail = document.getElementById('reset-email');
        if (resetEmail) {
            resetEmail.setAttribute('readonly', true)
        }
    </script>
@endsection
