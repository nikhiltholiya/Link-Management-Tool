<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBioLinkCustomThemeRequest;
use App\Http\Requests\UpdateBioLinkCustomThemeRequest;
use App\Services\BioLinkCustomThemeService;

class BioLinkCustomThemeController extends Controller
{
    protected BioLinkCustomThemeService $customThemeService;

    function __construct()
    {
        $this->customThemeService = new BioLinkCustomThemeService();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBioLinkCustomThemeRequest $request)
    {
        $this->customThemeService->createTheme($request->validated());

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBioLinkCustomThemeRequest $request, string $id)
    {
        $this->customThemeService->updateTheme($id, $request->validated());

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function active(string $id)
    {
        $this->customThemeService->activeTheme($id);

        return back();
    }
}
