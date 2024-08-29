<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class PaymentWarning
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $nextPayment = $request->attributes->get('next_payment');

        if ($nextPayment) {
            return back()->with('error', "You can not create it code before update your current subscription.");
        } else {
            return $next($request);
        }
    }
}
