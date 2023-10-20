<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Variation;
use App\Http\Requests\StoreVariationRequest;
use App\Http\Requests\UpdateVariationRequest;

class VariationController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Variation::class, 'variation');
    }
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
    public function store(StoreVariationRequest $request)
    {
        $data = $request->validated();
        Variation::create($data);

        return to_route('admin.products.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(Variation $variation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Variation $variation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVariationRequest $request)
    {
        
        $variationsData = $request->all();
        $filteredVariationsData = array_filter($variationsData, function($key) {
            return is_numeric($key);
        }, ARRAY_FILTER_USE_KEY);

        foreach ($filteredVariationsData as $variationData) {
            $variation = Variation::find($variationData['id']);

            if ($variation) {
                $variation->update([
                    'sku' => $variationData['sku'],
                    'price' => $variationData['price'],
                    'quantity' => $variationData['quantity'],
                    'cost' => $variationData['cost'],
                ]);
            }
        }

        return to_route('admin.products.create', $variation)->with('message', 'Variante aggiornata con successo');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Variation $variation)
    {
        //
    }
}
