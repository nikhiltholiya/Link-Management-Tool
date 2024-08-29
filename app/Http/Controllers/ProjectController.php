<?php

namespace App\Http\Controllers;

use App\Helpers\Utils;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Response as RequestResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    protected ProjectService $projectService;

    public function __construct()
    {
        $this->projectService = new ProjectService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $projects = $this->projectService->getPaginatedProjects($request->all());
        $limit = Utils::limitChecker('projects', $projects->total());

        return Inertia::render('Projects/Show', compact('projects', 'limit'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $projects = $this->projectService->getProjects();
        $limit = Utils::limitChecker('projects', $projects->count());

        if ($limit) {
            return back()->with("error", $limit);
        };

        $this->projectService->createProject($request->validated());

        return back()->with('success', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $project = $this->projectService->getProject($id);

        return Inertia::render('Projects/QRCodes', compact('project'));
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
    public function update(UpdateProjectRequest $request, string $id)
    {
        $this->projectService->updateProject($id, $request->validated());

        return back()->with('success', 'Bio Link updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->projectService->deleteProject($id);

        return back()->with('success', 'Project deleted successfully');
    }

    /**
     * Export projects list
     */
    public function export()
    {
        $projects = Project::where('link_type', 'projects')->get();
        $columns = Schema::getColumnListing((new Project())->getTable());
        $headers = Utils::exportToCSV($projects, $columns, 'projects');

        return RequestResponse::make('', 200, $headers);
    }
}
