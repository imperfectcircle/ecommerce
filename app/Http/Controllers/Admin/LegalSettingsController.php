<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateLegalSettingsRequest;
use App\Settings\LegalSettings;
use Inertia\Inertia;

class LegalSettingsController extends Controller
{
    public function show(LegalSettings $settings) {
        return Inertia::render('Admin/LegalSettings', compact('settings'));
    }

    public function update(UpdateLegalSettingsRequest $request, LegalSettings $legalSettings) {
        $legalSettings->fill($request->validated());

        $legalSettings->save();

        return to_route('admin.settings.index')->with('message', 'Impostazioni Legali aggiornate con successo');
    }
}
