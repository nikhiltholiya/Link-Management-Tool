@extends('installer.main')
@section('content')

<div class="text-center">
    <h6 class="text-2xl font-medium mb-4">
        {{__('Setup complete')}}
    </h6>
    <p class="mb-2">
        {{__('Your changed environment variables are set in the .env File now.')}}
    </p>
    <p>
        <a href="/" class="text-blue-500">
            {{__('Click here')}}
        </a> 
        {{__('to get back to your project')}}
    </p>
</div>
@endsection
