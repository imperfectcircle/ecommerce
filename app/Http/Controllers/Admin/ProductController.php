<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Actions\Product\LinkOption;
use Chefhasteeth\Pipeline\Pipeline;
use App\Http\Controllers\Controller;
use App\Actions\Product\UploadImages;
use App\Actions\Product\AttachVariations;
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
        return Pipeline::make()
            ->send($request->safe()->collect()->filter())
            ->through([
                fn($passable) => Product::create(
                    $passable
                    ->filter(fn($value) => !is_null($value))
                    ->except(['images', 'options', 'variations'])
                    ->all()
                ),
                fn($passable) => LinkOption::run(
                    $passable,
                    $request->validated('options', []),
                ),
                fn($passable) => AttachVariations::run(
                    $passable,
                    $request->validated('variations', []),
                ),
                fn($passable) => collect($request->validated('images'))->each(
                    function ($image) use ($passable) {
                        Cloudinary::upload($image->getRealPath())->getSecurePath();
                        $passable->attachMedia($image);
                    }
                ),
            ])->then(
                fn() => to_route('admin.products.index')->with('message', 'Prodotto creato con successo')
            );
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
        return Pipeline::make()
            ->send(
                $request
                    ->safe()
                    ->collect()
                    ->filter(),
            )
            ->through([
                function ($passable) use ($product) {
                    $product->update(
                        $passable->except(['images', 'options'])->all(),
                    );

                    return $product;
                },
                fn($passable) => LinkOption::run(
                    $passable,
                    $request->validated('options'),
                ),
                fn($passable) => collect($request->validated('images'))->each(
                    function ($image) use ($passable) {
                        Cloudinary::upload($image->getRealPath())->getSecurePath();
                        $passable->attachMedia($image);
                    }
                ),
            ])
            ->then(
                fn() => to_route('admin.products.index')->with('message', 'Prodotto aggiornato con successo')
            );
        /*$product->update(
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

        return to_route('admin.products.index')->with('message', 'Prodotto aggiornato con successo');*/
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
