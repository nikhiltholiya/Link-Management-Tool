<?php
    $payment_methods = [
        [
            'id'=>'stripe',
            'name'=>'Stripe',
            'method'=>'POST',
            'route'=>'/stripe/payment',
            'active'=> 0,
            'logo'=>asset('assets/icons/Stripe.png'),
        ],
        [
            'id'=>'paypal',
            'name'=>'Paypal',
            'method'=>'POST',
            'route'=>'/paypal/payment',
            'active'=> 0,
            'logo'=>asset('assets/icons/Paypal.png'),
        ],
        [
            'id'=>'razorpay',
            'name'=>'Razorpay',
            'method'=>'GET',
            'route'=>'/razorpay/form',
            'active'=> 0,
            'logo'=>asset('assets/icons/Razorpay.png'),
        ],
        [
            'id'=>'mollie',
            'name'=>'Mollie',
            'method'=>'POST',
            'route'=>'/mollie/payment',
            'active'=> 0,
            'logo'=>asset('assets/icons/Mollie.png'),
        ],
        [
            'id'=>'paystack',
            'name'=>'Paystack',
            'method'=>'GET',
            'route'=>'/paystack/redirect',
            'active'=> 0,
            'logo'=>asset('assets/icons/Paystack.png'),
        ],
    ];

    foreach ($methods as $method) {
        for ($i = 0; $i < count($payment_methods); $i++) {
            $element = $payment_methods[$i];
            if ($element['id'] == $method->name) {
                $payment_methods[$i]['active'] = $method->active;
                break;
            }
        }
    }
?>

<h6 class="text-xl text-gray-600 font-medium mb-6" >
    {{__('Available Payment methods')}}
</h6>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    @foreach($payment_methods as $item)
        @if ($item['active'])
        <div 
            id="{{$item['id']}}" 
            data-info="{{json_encode($item)}}"
            class="method payment_method p-6 rounded-lg cursor-pointer outline outline-1 hover:outline-2 hover:outline-blue-500"
        >
            <div class="flex items-center justify-between h-full">
                <p class="text-lg font-medium">{{$item['name']}}</p>
                <img 
                    src="{{$item['logo']}}" 
                    width="{{$item['name'] == 'Stripe' || $item['name'] == 'Mollie' ? '100' : '44'}}" 
                    alt="fastai-uilib"
                >
            </div>
        </div>
        @endif
    @endforeach
</div>