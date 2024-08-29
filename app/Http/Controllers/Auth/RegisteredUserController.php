<?php

namespace App\Http\Controllers\Auth;

use App\Models\Link;
use App\Models\PricingPlan;
use App\Models\SmtpSetting;
use App\Models\SocialLogin;
use App\Models\Theme;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use App\Rules\CheckLinkName;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(Request $request)
    {
        $app = app('setting');
        $google = SocialLogin::where('name', 'google')->first();
        $linkname = $request->linkname;

        return view('auth.register', compact('app', 'google', 'linkname'));
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, SmtpSetting $smtp): RedirectResponse
    {
        $theme = Theme::get()->first();
        $plan = PricingPlan::where('name', 'BASIC')->first();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'url_name' => ['required', 'string', 'max:50', 'unique:links', new CheckLinkName],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ])->assignRole('BASIC');
        $user->pricing_plan_id = $plan->id;
        $user->save();

        $link = new Link();
        $link->user_id = $user->id;
        $link->link_name = $request->name;
        $link->url_name = $request->url_name;
        $link->theme_id = $theme->id;
        $link->save();

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
