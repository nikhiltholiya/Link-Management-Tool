<?php

namespace App\Http\Controllers;

use App\Helpers\Utils;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Subscription;
use App\Services\SubscriptionService;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Response;

class SubscriptionController extends Controller
{
    protected SubscriptionService $subscriptionService;

    public function __construct()
    {
        $this->subscriptionService = new SubscriptionService();
    }


    // -----------------------------------------
    // Getting the billing information
    public function billing(Request $req, $id)
    {
        $type = $req->query()['type'];
        if ($type && $type == 'monthly' || $type == 'yearly') {
            $info = $this->subscriptionService->billingInfo($id);

            return view('pages.checkout', [...$info, 'type' => $type]);
        } else {
            return redirect()->route('plan')->with('error', 'Query param is not found or invalid.');
        }
    }
    // -----------------------------------------


    // -----------------------------------------
    // View payment history only for super admin
    public function subscriptions(Request $req)
    {
        $subscriptions = $this->subscriptionService->getSubscriptions($req->all());

        return  Inertia::render('Admin/Subscriptions', compact('subscriptions'));
    }
    // -----------------------------------------


    // Export testimonials list
    public function export()
    {
        $testimonials = Subscription::all();
        $columns = Schema::getColumnListing((new Subscription())->getTable());
        $headers = Utils::exportToCSV($testimonials, $columns, 'testimonials');

        return Response::make('', 200, $headers);
    }
}
