<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckNextPayment
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
        $user = auth()->user();
        $SA = $user->hasRole('SUPER-ADMIN');

        if ($SA) return $next($request);

        if ($user->next_payment) {
            if ($user->next_payment <= date('Y-m-d')) {
                return back()->with('error', 'Your subscription is over now. Please complete your payment before use app more.');
            } else {
                return $next($request);
            }
        } else {
            return $next($request);
        }
    }
}
