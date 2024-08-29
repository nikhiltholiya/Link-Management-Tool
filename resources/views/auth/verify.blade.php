@extends('layouts.dashboard.dashboard')

@section('content')
<div class="container py-4">
    <div class="row mt-5 justify-content-center">
        <div class="col-lg-8">
            <div class="card">
                <div class="card-header text-center">
                    {{__('Verify Your Email Address')}}
                </div>

                <div class="card-body p-4 text-center">
                    @if (session()->has('message'))
                        <div class="alert alert-success text-center" role="alert">
                            <p>{{__('A fresh verification link has been sent to your email address')}}</p>
                        </div>
                    @endif

                    <p>
                        {{__('Before proceeding, please click the below button than check your email for a verification link')}}
                    </p>
                    <form class="mt-4" method="POST" action="{{ route('verification.resend') }}">
                        @csrf
                        <button type="submit" class="btn btn-primary text-white">
                            {{__('click here to request another')}}
                        </button>.
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
