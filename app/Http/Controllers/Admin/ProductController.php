<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category')
            ->orderBy('id', 'desc')
            ->paginate(20);

        $products->getCollection()->transform(function ($product) {
            $product->formatted_created_at = $product->created_at->format('d-m-Y H:i:s');
            return $product;
        });

        return Inertia::render('Admin/ProductsIndex', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Admin/ProductForm', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $product = Product::create(
            $request
                ->safe()
                ->collect()
                ->filter(fn($value) => !is_null($value))
                ->except(['images'])
                ->all()
        );

        $images = $request->file('images');

        if ($images !== null) {
            foreach ($images as $image) {
                Cloudinary::upload($image->getRealPath(), [
                    'transformation' => [
                        'width' => '700',
                        'quality' => 'auto',
                        'crop' => 'scale',
                    ]
                ])->getSecurePath();

                $product->attachMedia($image);
            }
        }

        return to_route('admin.products.index')->with('message', 'Prodotto creato con successo');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();

        return Inertia::render('Admin/ProductForm', compact('product', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update(
            $request
                ->safe()
                ->collect()
                ->filter(fn($value) => !is_null($value))
                ->except(['images'])
                ->all()
        );

        $images = $request->file('images');

        if ($images !== null) {
            foreach ($images as $image) {
                Cloudinary::upload($image->getRealPath(), [
                    'transformation' => [
                        'width' => '700',
                        'quality' => 'auto',
                        'crop' => 'scale',
                    ]
                ])->getSecurePath();

                $product->attachMedia($image);
            }
        }

        return to_route('admin.products.index')->with('message', 'Prodotto aggiornato con successo');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $productName = $product->name;
        $product->delete();

        return redirect(route('admin.products.index'), 303)->with('message', 'Il prodotto ' .$productName. ' è stato rimosso con successo.');
    }
}
