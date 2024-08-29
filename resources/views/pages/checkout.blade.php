<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{__('Payment Checkout')}}</title>

        {{-- vites --}}
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
    </head>

    <body class="h-screen flex flex-col items-center justify-center">
        <div class="payment max-w-[1200px] w-full mx-auto p-6 md:p-7">        
            <div class="grid grid-cols-12 gap-7 items-start">
                <div class="col-span-12 md:col-span-8 shadow-card rounded-lg p-6">
                    @include('components.subscription_type.PaymentMethod')
                </div>
                <div class="col-span-12 md:col-span-4 shadow-card rounded-lg overflow-hidden">            
                    @include('components.subscription_type.OrderSummery')
        
                    <form id="checkoutForm" class="p-6">
                        @csrf
        
                        <input type="hidden" name="billing_type" value="{{$type}}">
                        <input type="hidden" name="plan_id" value="{{$plan->id}}">
        
                        <button 
                            id="checkout" 
                            type="submit"
                            class="p-3 w-full rounded-lg bg-blue-500 hover:bg-blue-600/95 text-white"
                        >
                            {{__('Checkout')}}
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <script src="{{ asset('script/payment.js') }}"></script>
    </body>
</html>