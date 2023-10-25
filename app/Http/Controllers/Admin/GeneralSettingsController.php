<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateGeneralSettingsRequest;
use App\Settings\GeneralSettings;
use Inertia\Inertia;

class GeneralSettingsController extends Controller
{
    public function show(GeneralSettings $settings) {
        return Inertia::render('Admin/GeneralSettings', compact('settings'));
    }

    public function update(UpdateGeneralSettingsRequest $request, GeneralSettings $settings) {
        $settings->fill($request->validated());
        $settings->save();

        return to_route('admin.settings.index')->with('message', 'Impostazioni Generali aggiornate con successo');
    }
}
