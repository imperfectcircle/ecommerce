<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;

class CategoryController extends Controller
{
    public function __construct() {
        $this->authorizeResource(Category::class, 'category');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::with('parent')
            ->orderBy('id', 'desc')
            ->paginate(10);
            
            $categories->getCollection()->transform(function ($category) {
                $category->formatted_created_at = $category->created_at->format('d-m-Y H:i:s');
                return $category;
            });

        return Inertia::render('Admin/CategoryIndex', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Admin/CategoryForm', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();
        $categoryName = $request->name;
        Category::create($data);

        return to_route('admin.categories.index')->with('message', 'La categoria ' .$categoryName. ' è stata creata con successo.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        $categories = Category::all();

        return Inertia::render('Admin/CategoryForm', compact('category', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());
        $categoryName = $request->name;

        return to_route('admin.categories.index')->with('message', 'La Categoria ' .$categoryName. ' è stata aggiornata con successo.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $categoryName = $category->name;
        $category->delete();

        return redirect(route('admin.categories.index'), 303)->with('message', 'La categoria ' .$categoryName. ' è stata eliminata con successo.');
    }
}
