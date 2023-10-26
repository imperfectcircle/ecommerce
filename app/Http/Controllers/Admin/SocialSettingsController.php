<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateSocialSettingsRequest;
use App\Settings\SocialSettings;
use Inertia\Inertia;

class SocialSettingsController extends Controller
{
    public function show(SocialSettings $settings) {
        return Inertia::render('Admin/SocialSettings', compact('settings'));
    }

    public function update(UpdateSocialSettingsRequest $request, SocialSettings $socialSettings) {
        $socialSettings->fill($request->validated());

        $socialSettings->save();

        return to_route('admin.settings.index')->with('message', 'Impostazioni Social aggiornato con successo');
    }
}
