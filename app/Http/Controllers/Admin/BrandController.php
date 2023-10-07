<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use Inertia\Inertia;

class BrandController extends Controller
{

    public function __construct() {
        $this->authorizeResource(Brand::class, 'brand');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = Brand::paginate(10);
        
        $brands->getCollection()->transform(function ($brand) {
            $brand->formatted_created_at = $brand->created_at->format('d-m-Y H:i:s');
            return $brand;
        });

        return Inertia::render('Admin/BrandsIndex', compact('brands'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/BrandForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request)
    {
        Brand::create($request->validated());
        $brandName = $request->name;

        return to_route('admin.brands.index')->with('message', 'Brand ' .$brandName. ' creato con successo.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        return Inertia::render('Admin/BrandForm', compact('brand'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        $brand->update($request->validated());
        $brandName = $request->name;

        return to_route('admin.brands.index')->with('message', 'Il Brand ' .$brandName. ' è stato aggiornato con successo.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        $brandName = $brand->name;
        $brand->delete();

        return redirect(route('admin.brands.index'), 303)->with('message', 'Il Brand ' .$brandName. ' è stato rimosso con successo.');
    }
}
