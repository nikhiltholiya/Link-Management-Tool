@extends('installer.main')
@section('content')    
    @include('installer.components.navbar', [
        'step1' => 'fill', 
        'step2' => 'fill', 
        'step3' => 'fill', 
        'step4' => 'fill', 
        'step5' => 'active'
    ])

    <div 
        id="loader" 
        class="hidden rounded-md bg-green-100 text-green-500 font-medium text-center text-sm px-5 py-3 mb-4"
    >
        {{__('Loading...')}}
    </div>

    @include('installer.components.message')

    <h6 class="text-2xl text-gray-900 font-medium mb-10 text-center">
        {{__('You are in the final step of installation process')}}
    </h6>

    <form  action="/setup/install" method="POST">
        @csrf

        <div class="w-full flex items-center justify-end mt-12">
            <a href="/setup/step-3" class="btn btn-outline-danger">
                <button 
                    type="button" 
                    class="button !bg-transparent !text-orange-500 border border-orange-500 !font-medium"
                >
                    {{__('Previous Step')}}
                </button>
            </a>

            <button id="openModal" type="submit" class="button ml-4">
                {{__('Confirm')}}
            </button>

            <div id="modal" class="hidden">
                <div class="modal-box md:max-w-md !bg-orange-50 !text-gray-900 !p-4 !rounded-md">
                    <p className="!text-justify !font-medium !mb-6">
                        Your app is currently undergoing an automatic install. This
                        process will take a few minutes. Please don't refresh your
                        page or don't turn off your device. Just stay with this
                        process.
                    </p>
                    <div className="relative w-full bg-gray-200 rounded-full mt-6">
                        <div id="shim-blue"></div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
@endsection
