<?php

namespace App\Http\Controllers\Gateways;

use App\Http\Controllers\Controller;
use App\Models\PricingPlan;
use App\Models\User;
use Illuminate\Http\Request;
use Tco\TwocheckoutFacade;

use function Pest\Laravel\json;

class TwoCheckoutController extends Controller
{
    public function show_form(Request $request)
    {
        $billing_type = $request->billing_type;
        $plan = PricingPlan::where('id', $request->plan_id)->first();
        $price = $billing_type == 'monthly' ? $plan->monthly_price :  $plan->yearly_price;

        return view('pages.gateways.twocheckout-form', compact('plan', 'price', 'billing_type'));
    }

    
    public function payment(Request $request)
    {
        // return $request->all();
        $user = User::where('id', auth()->user()->id)->first();
        $billing_type = $request->billing_type;
        $plan = PricingPlan::where('id', $request->plan_id)->first();
        $price = $billing_type == 'monthly' ? $plan->monthly_price :  $plan->yearly_price;

        $config    = [
            'sellerId' => config('twocheckout.sellerId'), // REQUIRED
            'secretKey' => config('twocheckout.secretKey'), // REQUIRED
            'jwtExpireTime' => config('twocheckout.jwtExpireTime'),
            'curlVerifySsl' => config('twocheckout.curlVerifySsl'),
        ];

        try{
            $tco = new TwocheckoutFacade($config);

            $orderParams = [
                'Country' => 'US',
                'Currency' => $plan->currency,
                'CustomerIP' => '',
                'ExternalReference' => 'CustOrd101',
                'Language' => 'en',
                'Source' => 'tcolib.local',
                'BillingDetails' => [   // billing details will be changed on live
                    'Address1' => 'Street 1',
                    'City' => 'Cleveland',
                    'State' => 'Ohio',
                    'CountryCode' => 'US',
                    'Email' => 'testcustomer@2Checkout.com',
                    'FirstName' => 'John',
                    'LastName' => 'Doe',
                    'Zip' => '20034',
                ],
                'Items' => [
                    [
                        'Name' => $plan->name,
                        'Description' => $plan->description,
                        'Quantity' => 1,
                        'IsDynamic' => true,
                        'Tangible' => false,
                        'PurchaseType' => 'PRODUCT',
                        'Price' => [
                            'Amount' => $price, //value
                            'Type' => 'CUSTOM',
                        ]
                    ]
                ],
                'PaymentDetails' => [
                    'Type' => 'TEST', //'TEST' or 'EES_TOKEN_PAYMENT'
                    'Currency' => $plan->currency,
                    'CustomerIP' => '91.220.121.21', // $req->ip() when it live
                    'PaymentMethod' => [
                        'RecurringEnabled' => false,
                        'HolderNameTime' => 1,
                        'CardNumberTime' => 1,
                        'EesToken' => $request->ess_token,

                    ],
                ],
            ];

            $result = $tco->apiCore()->call( '/orders/', $orderParams, 'POST' );
    
            return $result;
        }catch(\Exception $e){
            return $e->getMessage();
        }
    }
}
