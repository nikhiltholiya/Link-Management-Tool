<?php

namespace App\Http\Controllers\Gateways;

use App\Http\Controllers\Controller;
use App\Models\PaymentGateway;
use App\Models\PricingPlan;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;
use Mollie\Laravel\Facades\Mollie;


class MollieController extends Controller
{
    public function payment(Request $request)
    {
        $billing_type = $request->billing_type;
        $mollie = PaymentGateway::where('name', 'mollie')->first();
        $plan = PricingPlan::where('id', $request->plan_id)->first();
        $price = $billing_type == 'monthly' ? $plan->monthly_price :  $plan->yearly_price;

        Mollie::api()->setApiKey($mollie->key);
        $payment = Mollie::api()->payments->create([
            "amount" => [
                "currency" => $plan->currency,
                "value" =>  number_format($price,2,'.','')// You must send the correct number of decimals, thus we enforce the use of strings
            ],
            "description" => "Order #12345",
            "redirectUrl" => route('mollie.success'),
            // "webhookUrl" => route('webhooks.mollie'),
            "metadata" => [
                "order_id" => "12345",
            ],
        ]);

        session()->put('plan_id', $plan->id);
        session()->put('mollie_id', $payment->id);
        session()->put('billing_type', $billing_type);
    
        // redirect customer to Mollie checkout page
        return redirect($payment->getCheckoutUrl(), 303);
    }

    
    public function success(Request $request)
    {
        try {
            $user = User::where('id', auth()->user()->id)->first();
            $mollie = PaymentGateway::where('name', 'mollie')->first();
            $plan_id = session()->get('plan_id');
            $plan = PricingPlan::where('id', $plan_id)->first();
            $mollie_id = session()->get('mollie_id');
            $billing_type = session()->get('billing_type');
            $nextPayment = $billing_type == 'monthly' ? date('Y-m-d', strtotime('+1 month')) : date('Y-m-d', strtotime('+1 year'));

            Mollie::api()->setApiKey($mollie->key);
            $payment = Mollie::api()->payments->get($mollie_id);

            if ($payment->isPaid())
            {
                $subscription = Subscription::create([
                    'user_id' => $user->id,
                    'method' => 'mollie',
                    'billing' => $billing_type,
                    'transaction_id' => $payment->id,
                    'total_price' => $payment->amount->value,
                    'currency' => $plan->currency,
                ]);

                $user->pricing_plan_id = $plan->id;
                $user->next_payment = $nextPayment;
                $user->subscription_id = $subscription->id;
                $user->recurring = $billing_type;
                $user->save();

                return redirect()->route('plan')->with('success', 'Congratulation! Your payment have completed');
            }else {
                return redirect()->route('plan')->with('error', 'Your payment have failed, please try again later.');
            }
        } catch (\Throwable $th) {
            //throw $th;
            return redirect()->route('plan')->with('error', $th->getMessage());
        }
    }
}
