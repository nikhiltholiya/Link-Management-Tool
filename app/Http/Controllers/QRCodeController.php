<?php

namespace App\Http\Controllers;

use App\Helpers\Utils;
use App\Http\Requests\StoreQRCodeRequest;
use App\Services\ProjectService;
use App\Services\QRCodeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QRCodeController extends Controller
{
    protected QRCodeService $qrCodeService;
    protected ProjectService $projectService;

    public function __construct()
    {
        $this->qrCodeService = new QRCodeService();
        $this->projectService = new ProjectService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $qrcodes = $this->qrCodeService->getQrCodes($request->all());
        $limit = Utils::limitChecker('qrcodes', $qrcodes->total());

        return Inertia::render('QRCodes/Show', compact('qrcodes', 'limit'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $qrcodes = $this->qrCodeService->getQrCodes([]);
        $limit = Utils::limitChecker('qrcodes', $qrcodes->total());

        if ($limit) {
            return back()->with("error", $limit);
        };

        $projects = $this->projectService->getProjects(['id', 'project_name']);

        return Inertia::render('QRCodes/Create', compact('projects'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQRCodeRequest $request)
    {
        $this->qrCodeService->createQrCode($request->validated());

        if ($request->link_id) {
            return back()->with('success', 'New QR Code Created Successfully');
        } else {
            return redirect()->route('qrcodes.index')->with('success', 'New QR Code Created Successfully');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->qrCodeService->deleteQrCode($id);

        return back()->with('success', 'QR Code deleted successfully');
    }
}
