<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use App\Services\ThemeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThemeController extends Controller
{
    protected ThemeService $themeService;

    public function __construct()
    {
        $this->themeService = new ThemeService();
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $themes = Theme::all();

        return Inertia::render('Admin/ManageThemes', compact("themes"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function themeType(Request $request, string $id)
    {
        $this->themeService->updateThemeType($id, $request->type);

        return back()->with('success', 'Theme type have changed');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
