<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserRoleController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, User $user)
    {

        $data = $request->validate([
            'roles' => 'required|array',
            'roles.*' => 'sometimes|string|exists:\App\Models\Role,name',
        ]);

        

        $user->syncRoles($data['roles']);

        return redirect()->back(fallback: route('admin.users.edit', $user))->with('message', 'Ruolo dell\'utente aggiornato con successo');
    }
}
