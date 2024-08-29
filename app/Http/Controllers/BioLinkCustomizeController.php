<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateBioLinkLogoRequest;
use App\Http\Requests\UpdateBioLinkProfileRequest;
use App\Services\BioLinkCustomizeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BioLinkCustomizeController extends Controller
{
    protected BioLinkCustomizeService $customizeService;

    function __construct()
    {
        $this->customizeService = new BioLinkCustomizeService();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UpdateBioLinkProfileRequest $request)
    {
        $this->customizeService->profile($request->id, $request->validated());

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $data = $this->customizeService->showLink($id);

        if (!$data['link']) {
            abort(404, 'Link Not Found');
        };

        return Inertia::render('BioLinks/AddItem', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $this->customizeService->themeChange($id, $request->theme_id);

        return back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function social(Request $request, string $id)
    {
        $this->customizeService->social($id, $request->all());

        return back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function logo(UpdateBioLinkLogoRequest $request, string $id)
    {
        $this->customizeService->logoUpdate($id, $request->validated());

        return back();
    }
}
