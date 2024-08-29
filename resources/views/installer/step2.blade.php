@extends('installer.main')
@section('content')
    @include('installer.components.navbar', [
        'step1' => 'fill', 
        'step2' => 'fill', 
        'step3' => 'active'
    ])
            
    <form id="dataForm" action="{{route('setup.step2')}}" method="post">
        @csrf
        <input type="hidden" id="dataFormCheck" value="/setup/check-database">
        <div id="errorMessage" class="hidden rounded-md text-center text-sm px-5 py-3 mb-4"></div>
        <div id="db_settings" class="form-group"></div>

        <div class="mb-6">
            @include('installer.components.input-dropdown', [
                'id' => 'db_connection',
                'name' => 'db_connection',
                'required' => true,
                'label' => 'Select Database Type',
                'elements' => [
                    ['key'=>'mysql', 'title'=>'MySQL'],
                ]
            ])
        </div>

        <div class="mb-6">
            @include('installer.components.input', [
                'id' => 'db_host',
                'type' => 'text',
                'name' => 'db_host',
                'value' => $data['DB_HOST'],
                'label' => 'DB Host',
                'error' => $errors->first('db_host'),
                'placeholder' => '127.0.0.1',
            ])
        </div>

        <div class="mb-6">
            @include('installer.components.input', [
                'id' => 'db_port',
                'type' => 'text',
                'name' => 'db_port',
                'value' => $data['DB_PORT'],
                'label' => 'DB Port',
                'error' => $errors->first('db_port'),
                'placeholder' => '3306',
            ])
        </div>

        <div class="mb-6">
            @include('installer.components.input', [
                'id' => 'db_database',
                'type' => 'text',
                'name' => 'db_database',
                'label' => 'DB Database',
                'value' => $data["DB_DATABASE"],
                'error' => $errors->first('db_database'),
                'placeholder' => 'Database Name',
            ])
        </div>

        <div class="mb-6">
            @include('installer.components.input', [
                'id' => 'db_username',
                'type' => 'text',
                'name' => 'db_username',
                'value' => $data["DB_USERNAME"],
                'label' => 'DB Username',
                'error' => $errors->first('db_username'),
                'placeholder' => 'Username',
            ])
        </div>

        <div class="mb-6">
            @include('installer.components.input', [
                'id' => 'db_password',
                'type' => 'password',
                'name' => 'db_password',
                'label' => 'DB Password',
                'error' => $errors->first('db_password'),
                'placeholder' => 'Password',
            ])
        </div>

        <button id="dataFormButton" class="button w-full">
            {{__('Test Connection')}}
        </button>

        <div class="flex items-center justify-end mt-12">
            <a href="/setup/step-1" class="btn btn-outline-danger">
                <button 
                    type="button" 
                    class="button !bg-transparent !text-orange-500 border border-orange-500 !font-medium"
                >
                    {{__('Previous Step')}}
                </button>
            </a>
            <button type="submit" id="next_step" class="button ml-4 hidden">
                {{__('Next Step')}}
            </button>
        </div>
    </form>
@endsection
