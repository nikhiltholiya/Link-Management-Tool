<?php

namespace App\Http\Controllers;

use App\Helpers\Utils;
use App\Services\BioLinkService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use App\Http\Requests\StoreBioLinkRequest;
use App\Http\Requests\UpdateBioLinkRequest;
use Illuminate\Support\Facades\Response as RequestResponse;
use Stevebauman\Location\Facades\Location;
use App\Models\ShetabitVisit;
use App\Models\Link;
use Inertia\Inertia;
use Inertia\Response;

class BioLinkController extends Controller
{
    protected BioLinkService $bioLinkService;

    function __construct()
    {
        $this->bioLinkService = new BioLinkService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $links = $this->bioLinkService->getLinksByType($request->all(), 'biolink');
        $limit = Utils::limitChecker('biolinks', $links->total());

        return Inertia::render('BioLinks/Show', compact('links', 'limit'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBioLinkRequest $request)
    {
        $links = $this->bioLinkService->getLinksByType([], 'biolink');
        $limit = Utils::limitChecker('biolinks', $links->total());

        if ($limit) {
            return back()->with("error", $limit);
        }

        $this->bioLinkService->create($request->validated());

        return back()->with('success', 'Link created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBioLinkRequest $request, string $id)
    {
        $this->bioLinkService->update($id, $request->validated());

        return back()->with('success', 'Bio Link updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->bioLinkService->deleteLink($id);

        return back()->with('success', 'Link deleted successfully');
    }

    /**
     * Export biolinks list
     */
    public function export()
    {
        $biolinks = Link::where('link_type', 'biolink')->get();
        $columns = Schema::getColumnListing((new Link())->getTable());
        $headers = Utils::exportToCSV($biolinks, $columns, 'biolinks');

        return RequestResponse::make('', 200, $headers);
    }

    /**
     * View the specific user biolink
     */
    function visitLink(Request $request, $linkName)
    {
        $link = $this->bioLinkService->getLinkByUrl($linkName);

        if ($link) {
            $model = new ShetabitVisit();
            $result = $request->visitor()->visit($model);

            // when app on the live server then ip will be => $req->ip();
            // $location = Location::get("103.146.2.177");
            $location = Location::get($request->ip());

            ShetabitVisit::where('id', $result->id)->update([
                'ip' => json_encode($location),
                'link_id' => $link->id,
            ]);

            if ($link->link_type == 'shortlink') {
                return redirect()->to(url($link->external_url));
            } else {
                return Inertia::render('BioLinks/View', compact('link'));
            }
        } else {
            abort(404);
        }
    }
}
