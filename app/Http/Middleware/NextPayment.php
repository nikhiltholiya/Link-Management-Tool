<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;
use Carbon\Carbon;

class NextPayment
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        $SA = $user->hasRole('SUPER-ADMIN');
        Inertia::share('next_payment', false);
        $request->attributes->set('next_payment', false);

        if ($SA) return $next($request);

        if ($user->next_payment) {
            $paymentData = Carbon::parse($user->next_payment);
            $currentDate = Carbon::parse(date('Y-m-d'));
            // dd($paymentData->lt($currentDate));

            if ($paymentData->lt($currentDate)) {
                Inertia::share('next_payment', true);
                $request->attributes->set('next_payment', true);

                return $next($request);
            } else {
                return $next($request);
            }
        } else {
            return $next($request);
        }
    }
}
