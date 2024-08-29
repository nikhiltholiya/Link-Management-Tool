<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomPageRequest;
use App\Models\AppSection;
use App\Models\CustomPage;
use Inertia\Inertia;

class CustomPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $custom_pages = CustomPage::all();

        return Inertia::render('Admin/CustomPage/Show', compact('custom_pages'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/CustomPage/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomPageRequest $request)
    {
        CustomPage::create($request->validated());

        return redirect()
            ->route('custom-page.index')
            ->with('success', 'A new page created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $page)
    {
        $app = app('setting');
        $customPages = CustomPage::all();
        $appSections = AppSection::all();
        $currentPage = CustomPage::where('route', $page)->first();

        if (!$currentPage) {
            abort(404);
        }

        return view('pages/custom-page', compact('app', 'customPages', 'currentPage', 'appSections'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $custom_page = CustomPage::find($id);

        return Inertia::render('Admin/CustomPage/Update', compact('custom_page'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCustomPageRequest $request, string $id)
    {
        CustomPage::find($id)->update($request->validated());

        return redirect()
            ->route('custom-page.index')
            ->with('success', 'Page updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        CustomPage::find($id)->delete();

        return back()->with('success', 'Page deleted successfully.');
    }
}
