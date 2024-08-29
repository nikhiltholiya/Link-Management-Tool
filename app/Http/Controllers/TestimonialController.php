<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTestimonialRequest;
use App\Http\Requests\UpdateTestimonialRequest;
use App\Models\Testimonial;
use App\Services\TestimonialService;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    protected TestimonialService $testimonialService;

    public function __construct()
    {
        $this->testimonialService = new TestimonialService();
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testimonials = $this->testimonialService->getTestimonials();

        return Inertia::render('Admin/Testimonials', compact('testimonials'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTestimonialRequest $request)
    {
        $this->testimonialService->createTestimonial($request->validated());

        return back()->with('success', "Testimonial successfully created.");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTestimonialRequest $request, string $id)
    {
        $this->testimonialService->updateTestimonial($id, $request->validated());

        return back()->with('success', "Testimonial successfully updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Testimonial::find($id)->delete();

        return back()->with('success', "Testimonial successfully deleted.");
    }
}
