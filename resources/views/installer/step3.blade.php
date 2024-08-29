@extends('installer.main')
@section('content')
    @include('installer.components.navbar', [
        'step1' => 'fill', 
        'step2' => 'fill', 
        'step3' => 'fill', 
        'step4' => 'active'
    ])
            
    <form action="/setup/step-3" method="POST">
        @csrf

        @include('installer.components.message')

        <div class="mb-6">
            @include('installer.components.input', [
                'id' => 'name',
                'type' => 'text',
                'name' => 'name',
                'label' => 'Admin Name',
                'value' => $data["name"],
                'error' => $errors->first('name'),
                'placeholder' => 'Admin name',
            ])
        </div>

        <div class="mb-6">
            @include('installer.components.input', [
                'id' => 'email',
                'type' => 'email',
                'name' => 'email',
                'value' => $data["email"],
                'label' => 'Admin Email',
                'error' => $errors->first('email'),
                'placeholder' => 'Admin email',
            ])
        </div>

        <div class="mb-6">
            @include('installer.components.input', [
                'id' => 'password',
                'type' => 'password',
                'name' => 'password',
                'label' => 'Admin Password',
                'value' => $data["password"],
                'error' => $errors->first('password'),
                'placeholder' => 'Admin password',
            ])
        </div>

        <button 
            class="button w-full @if(session('success')) success @endif @if(session('error')) error @endif"
        >
            {{__('Save Admin Info')}}
        </button>

        <div class="flex items-center justify-end mt-12">
            <a href="/setup/step-2" class="btn btn-outline-danger">
                <button 
                    type="button" 
                    class="button !bg-transparent !text-orange-500 border border-orange-500 !font-medium"
                >
                    {{__('Previous Step')}}
                </button>
            </a>

            @if (session('success'))
                <a href="/setup/install">
                    <button type="button" class="button ml-4">
                        {{__('Next Step')}}
                    </button>
                </a>
            @endif
        </div>
    </form>
@endsection
