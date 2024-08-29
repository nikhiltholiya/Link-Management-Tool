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
                        <form class="auth-form" method="POST" action="{{ route('login') }}">
                            @csrf

                            <h5 class="mb-4" style="color: #1D2939">{{__('Payment')}}</h5>
                            
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</div>
@endsection