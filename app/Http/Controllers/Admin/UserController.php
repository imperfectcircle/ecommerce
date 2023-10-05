<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('roles')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($user) {
            $user->formatted_created_at = $user->created_at->format('d-m-Y H:i:s');
            return $user;
        });

        return Inertia::render('Admin/UsersIndex', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/UserForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $userName = $request->name;
        User::create($data);
        
        return to_route('admin.users.index')->with('message', 'Utente ' .$userName. ' creato con successo.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        
        $permissions = Permission::all();
        $roles = Role::all();
        $user->getRoleNames();
        $user->getPermissionNames();
        
        return Inertia::render('Admin/UserForm', compact('user', 'permissions', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        
        $user->update($data);
        $userName = $user->name;

        return to_route('admin.users.index')->with('message', 'L\'Utente ' .$userName. ' è stato aggiornato con successo.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $userName = $user->name;
        $user->delete();

        return redirect(route('admin.users.index'), 303)->with('message', 'L\'Utente ' .$userName. ' è stato rimosso con successo.');

    }
}
