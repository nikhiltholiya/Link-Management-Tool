<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected DashboardService $dashboardService;

    function __construct()
    {
        $this->dashboardService = new DashboardService();
    }


    public function index()
    {
        [
            'links' => $links,
            'qrcodes' => $qrcodes,
            'projects' => $projects,
            'analytics' => $analytics
        ] = $this->dashboardService->getDashboardsInfo();

        $visitors = $this->dashboardService->monthlyVisitors($analytics);
        $page_view = $this->dashboardService->weeklyPageView($analytics);
        $analytics = $analytics->count();

        return Inertia::render(
            'Dashboard',
            compact('qrcodes', 'links', 'analytics', 'projects', 'visitors', 'page_view')
        );
    }
}
