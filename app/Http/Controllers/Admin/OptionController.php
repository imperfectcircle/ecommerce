<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Option;
use App\Http\Requests\StoreOptionRequest;
use App\Http\Requests\UpdateOptionRequest;
use Inertia\Inertia;

class OptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOptionRequest $request)
    {
        $option = Option::create($request->only(['name']));

        $option->values()->createMany($request->all()['values']);

        return redirect()->back(fallback: route('admin.products.create', $option))->with('message', 'Opzioni aggiunte con successo');
    }

    /**
     * Display the specified resource.
     */
    public function show(Option $option)
    {
        return Inertia::render('admin.options.show', compact('option'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Option $option)
    {
        return Inertia::render('admin.options.edit', compact('option'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOptionRequest $request, Option $option)
    {
        $option->update($request->only(['name']));

        $option->values()->delete();

        $option->values()->createMany($request->all()['values']);

        return Inertia::render('admin.options.show', compact('option'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Option $option)
    {
        //
    }
}
