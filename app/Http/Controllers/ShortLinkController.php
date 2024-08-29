<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Helpers\Utils;
use Illuminate\Support\Facades\Schema;
use App\Http\Requests\StoreShortLinkRequest;
use App\Http\Requests\UpdateShortLinkRequest;
use App\Models\Language;
use App\Models\ShetabitVisit;
use Illuminate\Support\Facades\Response as RequestResponse;
use App\Services\ShortLinkService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShortLinkController extends Controller
{
    protected ShortLinkService $shortLinkService;

    function __construct()
    {
        $this->shortLinkService = new ShortLinkService();
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $links = $this->shortLinkService->getLinksByType($request->all(), 'shortlink');
        $limit = Utils::limitChecker('shortlinks', $links->total());

        return Inertia::render('ShortLinks/Show', compact('links', 'limit'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShortLinkRequest $request)
    {
        $links = $this->shortLinkService->getLinksByType([], 'shortlink');
        $limit = Utils::limitChecker('shortlink', $links->total());

        if ($limit) {
            return back()->with("error", $limit);
        }

        $this->shortLinkService->create($request->validated());

        return back()->with('success', 'Short Link created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShortLinkRequest $request, string $id)
    {
        $this->shortLinkService->update($id, $request->validated());

        return back()->with('success', 'Short Link updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->shortLinkService->deleteLink($id);

        return back()->with('success', 'Short link deleted successfully');
    }

    /**
     * Export shortlink list
     */
    public function export()
    {
        $shortlink = Link::where('link_type', 'shortlink')->get();
        $columns = Schema::getColumnListing((new Link())->getTable());
        $headers = Utils::exportToCSV($shortlink, $columns, 'shortlinks');

        return RequestResponse::make('', 200, $headers);
    }

    /**
     * Bio-link analytics for tracking bio-link
     */
    public function analytics($id)
    {
        try {
            $languages = Language::get();
            $analytics = ShetabitVisit::where('link_id', $id)->get();

            return Inertia::render('LinkAnalytics', compact('analytics', 'languages'));
        } catch (\Throwable $th) {
            return back()->with("error", $th->getMessage());
        }
    }
}
