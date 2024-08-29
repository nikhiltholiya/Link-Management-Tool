<div class="order-summery">
    <div class="summery-header bg-gray-100 px-6 py-4">
        <h6 class="text-xl text-gray-600 font-medium" >
            {{__('Order Summery')}}
        </h6>
    </div>

    <div class="summery-body px-6 mt-6">
        <div class="body-item flex items-center justify-between mb-5">
            <p class="title">{{__('Plan Name')}}</p>
            <p>{{$plan->name}}</p>
        </div>
    </div>

    <div class="summery-body px-6">
        <div class="body-item flex items-center justify-between mb-5">
            <p class="title">{{__('Billing Type')}}</p>
            <p id="frequency">
                {{$type == 'monthly' ? 'Monthly' : 'Yearly'}} 
            </p>
        </div>
    </div>

    <div class="summery-body px-6">
        <div class="body-item flex items-center justify-between mb-5">
            <p class="title">{{__('Pay With')}}</p>
            <p id="paymentMethod">{{__('')}}</p>
        </div>
    </div>

    <div class="summery-body px-6">
        <div class="body-item flex items-center justify-between mb-5">
            <p class="title">{{__('Price')}}</p>
            <p id="summeryPrice">
                {{$type == 'monthly' ? $plan->monthly_price : $plan->yearly_price}} 
                {{__('USD')}}
                {{$plan->currency}}
            </p>
        </div>
    </div>

    <div class="summery-footer px-6 flex items-center justify-between" >
        <p class="text-lg font-medium">{{__('Total')}}</p>
        <p id="totalPrice" class="text-lg font-medium">
            {{$type == 'monthly' ? $plan->monthly_price : $plan->yearly_price}} 
            {{$plan['currency']}}
        </p>
    </div> 
</div>