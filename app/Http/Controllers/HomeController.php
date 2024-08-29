<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateHomeSectionRequest;
use App\Services\IntroPageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class HomeController extends Controller
{
    protected IntroPageService $introService;

    public function __construct()
    {
        $this->introService = new IntroPageService();
    }


    public function index(Request $request)
    {
        $SA = false;
        $customize = false;
        $introInfo = $this->introService->getIntroInfo();

        if (app('user')) {
            $SA = app('user')->hasRole('SUPER-ADMIN');
            if ($SA && $request->customize) {
                $customize = true;
            } else {
                $customize = false;
            }
        };

        return view(
            'pages.home',
            [...$introInfo, 'app' => app('setting'), 'SA' => $SA, 'customize' => $customize]
        );
    }


    //-------------------------------------------------
    // Section edit or update of home page
    public function section(UpdateHomeSectionRequest $request, $id)
    {
        $this->introService->updateAppSection($id, $request->validated());

        return back();
    }
    //-------------------------------------------------


    //-------------------------------------------------
    // Section edit or update of home page
    public function sectionList(Request $request, $id)
    {
        $this->introService->updateSectionList($id, $request->all());

        return back();
    }
    //-------------------------------------------------


    //-------------------------------------------------
    // Section edit or update of home page
    public function migrate()
    {
        Artisan::call('migrate --force');

        return back();
    }
    //-------------------------------------------------
}
