<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreBioLinkBlockRequest;
use App\Http\Requests\UpdateBioLinkBlockRequest;
use App\Services\BioLinkBlockService;

class BioLinkBlockController extends Controller
{
    protected BioLinkBlockService $blockService;

    public function __construct()
    {
        $this->blockService = new BioLinkBlockService();
    }

    //--------------------------------------------------------
    // Add new element of bio-link
    public function store(StoreBioLinkBlockRequest $request)
    {
        $this->blockService->createBlock($request->validated());

        return back()->with('success', "New biolink block successfully added");
    }
    //--------------------------------------------------------


    //--------------------------------------------------------
    // Updating an element of bio-link
    public function update(UpdateBioLinkBlockRequest $request, $id)
    {
        $this->blockService->updateBLock($id, $request->validated());

        return back()->with('success', "Biolink block successfully added");
    }
    //--------------------------------------------------------


    //--------------------------------------------------------
    // Updating the position of bio-link elements when user drag and drop on view.
    function position(Request $request, $id)
    {
        $linkItems = json_decode(json_encode($request->linkItems));
        $this->blockService->changeBlockPosition($id, $linkItems);

        return back();
    }
    //--------------------------------------------------------


    //--------------------------------------------------------
    // Delete an element of bio-link
    function destroy($id)
    {
        $this->blockService->deleteBlock($id);

        return back()->with('success', 'Biolink block successfully deleted');
    }
    //--------------------------------------------------------
}
