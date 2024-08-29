@extends('installer.main')
@section('content')
    @include('installer.components.navbar', [
        'step1' => 'fill', 
        'step2' => 'active'
    ])

    <form action="{{route('setup.step1')}}" method="post">
        @csrf
        <div class="mb-6">
            @include('installer.components.input', [
                'id' => 'app_name',
                'type' => 'text',
                'name' => 'app_name',
                'value' => $data['APP_NAME'],
                'label' => 'Name your Application',
                'error' => $errors->first('app_name'),
                'placeholder' => 'Enter your app name',
            ])
        </div>

        <div class="mb-6">
            @include('installer.components.input-dropdown', [
                'id' => 'app_env',
                'name' => 'app_env',
                'required' => true,
                'label' => 'Select Environment',
                'default' => $data['APP_ENV'],
                'elements' => [
                    ['key'=>'local', 'title'=>'Local'],
                    ['key'=>'testing', 'title'=>'Testing'],
                    ['key'=>'production', 'title'=>'Production'],
                ]
            ])
        </div>

        <div class="mb-6">
            @include('installer.components.input-dropdown', [
                'id' => 'app_debug',
                'name' => 'app_debug',
                'required' => true,
                'label' => 'App Debug Mode',
                'default' => $data['APP_DEBUG'],
                'elements' => [
                    ['key'=>'true', 'title'=>'True'],
                    ['key'=>'false', 'title'=>'False'],
                ]
            ])
        </div>

        <div class="mb-12">
            <div>
                @include('installer.components.input', [
                    'id' => 'app_key',
                    'type' => 'text',
                    'name' => 'app_key',
                    'value' => $data['APP_KEY'],
                    'label' => 'Name your Application',
                    'error' => $errors->first('app_key'),
                    'placeholder' => 'Click button to generate key',
                ])
            </div>

            <button 
                id="generate_key" 
                type="button"
                title="Generate"
                class="button !bg-transparent !text-orange-500 border border-orange-500 !font-medium mt-4" 
            >
                {{__('Generate Key')}}
            </button>
        </div>

        <div class="flex items-center justify-end">
            <a href="/setup">
                <button 
                    type="button" 
                    class="button !bg-transparent !text-orange-500 border border-orange-500 !font-medium"
                >
                    {{__('Previous Step')}}
                </button>
            </a>
            <button type="submit" id="next"  class="button ml-4">
                {{__('Next Step')}}
            </button>
        </div>
    </form>
@endsection
