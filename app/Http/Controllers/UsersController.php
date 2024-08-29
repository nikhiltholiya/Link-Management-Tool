<?php

namespace App\Http\Controllers;

use App\Helpers\Utils;
use App\Models\User;
use App\Services\UsersService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Response as RequestResponse;

class UsersController extends Controller
{
    protected UsersService $usersService;

    public function __construct()
    {
        $this->usersService = new UsersService();
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $users = $this->usersService->getUsers($request->all());

        return Inertia::render('Admin/Users', compact('users'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {
        $this->usersService->updateUser($id, $request->validated());

        return back()->with('success', 'User account status successfully changed');
    }

    /**
     * Export users list
     */
    public function export()
    {
        $users = User::all();
        $columns = Schema::getColumnListing((new User())->getTable());
        $headers = Utils::exportToCSV($users, $columns, 'users');

        return RequestResponse::make('', 200, $headers);
    }
}
