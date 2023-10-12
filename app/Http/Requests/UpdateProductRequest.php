<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('product'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        //dd($this->request);
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'sku' =>
                'required|string|unique:products,sku,'.$this->route('product')->id,
            'track_quantity' => 'sometimes|nullable|boolean',
            'quantity' => 'required_if:track_quantity,true|nullable|int',
            'sell_out_of_stock' => 'required_if:track_quantity,true|boolean',
            'category_id' => 'required|int|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'cost' => 'sometimes|nullable|numeric',
            'discounted_price' => 'sometimes|nullable|numeric',
            'status' => 'required|string|in:active,draft,review',
            'images' => 'sometimes|nullable|array',
            'canonical_url' => 'sometimes|nullable|string|max:255|url',
            'seo_title' => 'sometimes|nullable|string|max:255',
            'seo_description' => 'sometimes|nullable|string|max:255',
            'seo_keywords' => 'sometimes|nullable|string|max:255'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Il campo Nome è richiesto.',
            'name.string' => 'Il campo Nome deve essere di tipo testo.',
            'name.max' => 'Il campo Nome può avere una lunghezza massima di 255 caratteri.',
            'description.required' => 'Il campo Descrizione è richiesto.',
            'description.string' => 'Il campo Descrizione deve essere di tipo testo.',
            'sku.required' => 'Il campo Codice Articolo è richiesto.',
            'sku.string' => 'Il campo Codice Articolo deve essere di tipo testo.',
            'sku.unique' => 'Il Codice Articolo inserito esiste già.',
            'quantity.required_if' => 'Il campo Quantità è richiesto.',
            'sell_out_of_stock.required_if' => 'Il campo Esaurito è richiesto.',
            'category_id.required' => 'Il campo Categoria di Appartenenza è richiesto.',
            'category_id.exists' => 'La categoria selezionata non esiste.',
            'price.required' => 'Il campo Prezzo è richiesto.',
            'status.required' => 'Il campo Stato è richiesto.',
            'status.in' => 'Il campo Stato può essere Bozza, Revisione o Attivo.',
            'canonical_url.url' => 'Il campo URL Canonica deve essere un URL valida.',
            'canonical_url.string' => 'Il campo URL Canonica deve essere di tipo testo.',
            'canonical_url.max' => 'Il campo URL Canonica può avere una lunghezza massima di 255 caratteri.',
            'seo_title.string' => 'Il campo Titolo SEO deve essere di tipo testo.',
            'seo_title.max' => 'Il campo Titolo SEO può avere una lunghezza massima di 255 caratteri.',
            'seo_description.string' => 'Il campo Descrizione SEO deve essere di tipo testo.',
            'seo_description.max' => 'Il campo Descrizione SEO può avere una lunghezza massima di 255 caratteri.',
            'seo_keywords.string' => 'Il campo Parole Chiave deve essere di tipo testo.',
            'seo_keywords.max' => 'Il campo Parole Chiave può avere una lunghezza massima di 255 caratteri.',
        ];
    }
}
