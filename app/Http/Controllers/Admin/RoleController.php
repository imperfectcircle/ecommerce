<?php

namespace App\Http\Controllers\Admin;

use App\Models\Role;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all()->map(function ($role) {
            $role->formatted_created_at = $role->created_at->format('d-m-Y H:i:s');
            return $role;
        });;

        return Inertia::render('Admin/RolesIndex', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/RoleForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        Role::create($request->validated());
        $roleName = $request->name;

        return to_route('admin.roles.index')->with('message', 'Ruolo ' .$roleName. ' creato con successo.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        $permissions = Permission::all();

        return Inertia::render('Admin/RoleForm', compact('role', 'permissions'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        $role->update($request->validated());
        $roleName = $request->name;

        return to_route('admin.roles.index')->with('message', 'Il Ruolo ' .$roleName. ' è stato aggiornato con successo.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $roleName = $role->name;
        $role->delete();

        return redirect(route('admin.roles.index'), 303)->with('message', 'Il ruolo ' .$roleName. ' è stato rimosso con successo.');

    }
}