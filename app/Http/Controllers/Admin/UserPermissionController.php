<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserPermissionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, User $user)
    {
        $data = $request->validate([
            'permissions' => 'array',
            'permissions.*' => 'sometimes|string|exists:\Spatie\Permission\Models\Permission,name'
        ]);

        $user->syncPermissions($data['permissions']);

        return redirect()->back(fallback: route('admin.users.edit', $user))->with('message', 'Autorizzazioni dell\'utente aggiornati con successo.');
    }
}
