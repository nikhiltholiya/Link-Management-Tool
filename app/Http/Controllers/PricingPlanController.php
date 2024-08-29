<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePricingPlanRequest;
use App\Http\Requests\UpdatePricingPlanRequest;
use App\Models\PaymentGateway;
use App\Models\User;
use App\Services\PricingPlanService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PricingPlanController extends Controller
{
    protected PricingPlanService $planService;

    public function __construct()
    {
        $this->planService = new PricingPlanService();
    }


    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $user = app('user');
        $SA = $user->hasRole('SUPER-ADMIN');
        $plans = $this->planService->getPricingPlans($SA);

        if ($SA) {
            return Inertia::render('Admin/PricingPlans/Show', compact('plans'));
        } else {
            return Inertia::render('CurrentPlan/Select', compact('plans'));
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/PricingPlans/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePricingPlanRequest $request)
    {
        $this->planService->createPricingPlan($request->validated());

        return redirect()
            ->route('pricing-plans.index')
            ->with('success', 'A new pricing plan have created');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $plan = $this->planService->getPricingPlan($id);

        return Inertia::render('CurrentPlan/Show', compact('plan'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $plan = $this->planService->getPricingPlan($id);

        return Inertia::render('Admin/PricingPlans/Update', compact('plan'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePricingPlanRequest $request, string $id)
    {
        $this->planService->updatePricingPlan($id, $request->validated());

        return redirect()
            ->route('pricing-plans.index')
            ->with('success', 'Pricing plan successfully updated');
    }

    /**
     * Select a specific price to update user current plan.
     */
    public function selected(Request $request, $id)
    {
        $type = $request->type;
        $plan = $this->planService->getPricingPlan($id);
        $methods = PaymentGateway::where('active', true)->get();

        return view('pages.checkout', compact('plan', 'type', 'methods'));
    }

    /**
     * Select a specific price to update user current plan.
     */
    public function basicPlan($id)
    {
        User::find(auth()->user()->id)->update([
            'pricing_plan_id' => $id,
            'next_payment' => null,
            'subscription_id' => null,
            'recurring' => null,
        ]);

        return redirect()
            ->route('current-plan.show', ['id' => $id])
            ->with('success', 'Your plan is successfully down on the basic plan.');
    }
}
