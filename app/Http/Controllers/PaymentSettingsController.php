<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePaymentGatewayRequest;
use App\Services\PaymentSettingsService;
use Inertia\Inertia;

class PaymentSettingsController extends Controller
{
    private PaymentSettingsService $paymentService;

    public function __construct()
    {
        $this->paymentService = new PaymentSettingsService();
    }

    /**
     * Display the user's profile form.
     */
    public function index()
    {
        $paymentMethods = $this->paymentService->getPaymentMethods();

        return Inertia::render('Admin/PaymentSetup', $paymentMethods);
    }

    /**
     * Update the user's profile information.
     */
    public function update(UpdatePaymentGatewayRequest $request, $id)
    {
        $this->paymentService->updatePaymentMethod($id, $request->validated());

        return back()->with('success', 'Payment gateway successfully updated.');
    }
}
