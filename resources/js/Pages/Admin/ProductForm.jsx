import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { BiHomeAlt2 } from 'react-icons/bi';

export default function ProductForm({ auth, product, categories }) {
    const { data, setData, post, put, processing, errors } = useForm(
        product
            ? {
                  name: product.name,
                  description: product.description,
                  sku: product.sku,
                  price: product.price,
                  discounted_price: product.discounted_price,
                  cost: product.cost,
                  quantity: product.quantity,
                  track_quantity: product.track_quantity,
                  sell_out_of_stock: product.sell_out_of_stock,
                  status: product.status,
              }
            : {
                  name: '',
                  description: '',
                  sku: '',
                  price: '',
                  discounted_price: '',
                  cost: '',
                  quantity: '',
                  track_quantity: '',
                  sell_out_of_stock: '',
                  status: '',
              },
    );

    const submit = (event) => {
        event.preventDefault();
        if (product) {
            put(route('admin.products.update', product));
            return;
        }
        post(route('admin.products.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            {product ? (
                <div className="pt-[100px]">
                    <Head title="Modifica Prodotto" />
                    <h1 className="mt-5 pb-5 text-center text-4xl font-bold">
                        Stai modificando il prodotto: {product.name}
                    </h1>
                </div>
            ) : (
                <div className="pt-[100px]">
                    <Head title="Crea Prodotto" />
                    <h1 className="mt-5 pb-5 text-center text-4xl font-bold">
                        Nuovo Prodotto
                    </h1>
                </div>
            )}
            <div className="flex space-x-2 py-5">
                <Link
                    className="flex items-center underline transition-all duration-150 hover:text-red-500"
                    href={route('admin.dashboard')}
                >
                    <BiHomeAlt2 /> Dashboard
                </Link>
                {'>'}
                <Link
                    className="underline transition-all duration-150 hover:text-red-500"
                    href={route('admin.products.index')}
                >
                    Prodotti
                </Link>
                {'>'}
                {product ? <p>Modifica Prodotto</p> : <p>Crea Prodotto</p>}
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="w-full rounded-b-lg shadow-lg">
                    <div className="rounded-t-lg bg-violet-200 p-5 ">
                        <p className="text-xl">Informazioni Prodotto</p>
                    </div>
                    <div className="p-5">
                        <form id="productForm" onSubmit={submit}>
                            <div>
                                <InputLabel
                                    className={`text-xl ${
                                        errors.name ? 'text-red-500' : ''
                                    }`}
                                    htmlFor="name"
                                    value="Nome"
                                />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className={`mt-1 block w-full ${
                                        errors.name ? 'border-red-500' : ''
                                    } focus:bg-emerald-200`}
                                    autoComplete="off"
                                    onChange={(event) =>
                                        setData('name', event.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    className="mt-2 text-xl"
                                    message={errors.name}
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    className={`text-xl ${
                                        errors.description ? 'text-red-500' : ''
                                    }`}
                                    htmlFor="description"
                                    value="Descrizione"
                                />

                                <textarea
                                    rows="10"
                                    className={`mt-1 block w-full resize-none rounded-md text-xl shadow-lg ${
                                        errors.description
                                            ? 'border-red-500'
                                            : ''
                                    } focus:bg-emerald-200`}
                                    name="description"
                                    id="description"
                                    value={data.description}
                                    onChange={(ev) =>
                                        setData('description', ev.target.value)
                                    }
                                >
                                    {data.description}
                                </textarea>

                                <InputError
                                    className="mt-2 text-xl"
                                    message={errors.description}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-full rounded-b-lg shadow-lg">
                    <div className="rounded-t-lg bg-violet-200 p-5 ">
                        <p className="text-xl">Immagini</p>
                    </div>
                    <div className="p-5">{/* Immagini */}</div>
                </div>
                <div className="w-full rounded-b-lg shadow-lg">
                    <div className="rounded-t-lg bg-violet-200 p-5 ">
                        <p className="text-xl">Dettagli Prezzi</p>
                    </div>
                    <div className="p-5">{/* Informazioni sui Prezzi */}</div>
                </div>
                <div className="w-full rounded-b-lg shadow-lg">
                    <div className="rounded-t-lg bg-violet-200 p-5 ">
                        <p className="text-xl">Inventario</p>
                    </div>
                    <div className="p-5">{/* Inventario */}</div>
                </div>
                <div className="w-full rounded-b-lg shadow-lg">
                    <div className="rounded-t-lg bg-violet-200 p-5 ">
                        <p className="text-xl">Varianti</p>
                    </div>
                    <div className="p-5">{/* Versioni */}</div>
                </div>
                <div className="w-full rounded-b-lg shadow-lg">
                    <div className="rounded-t-lg bg-violet-200 p-5 ">
                        <p className="text-xl">SEO</p>
                    </div>
                    <div className="p-5">{/* SEO */}</div>
                </div>
                <div className="w-full rounded-b-lg shadow-lg">
                    <div className="rounded-t-lg bg-violet-200 p-5 ">
                        <p className="text-xl">Stato del Prodotto</p>
                    </div>
                    <div className="p-5">{/* Stato del Prodotto */}</div>
                </div>
                <div className="w-full rounded-b-lg shadow-lg">
                    <div className="rounded-t-lg bg-violet-200 p-5 ">
                        <p className="text-xl">Gestione del Prodotto</p>
                    </div>
                    <div className="p-5">{/* Gestione del Prodotto */}</div>
                </div>
            </div>
            <div className="mt-10 text-center">
                <input
                    type="submit"
                    disabled={processing}
                    className="ml-4 mt-5 inline-flex items-center rounded-md border border-transparent bg-sky-400 px-6 py-3 text-[20px] text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-sky-500 focus:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-sky-900"
                    form="productForm"
                    value={product ? 'Modifica Prodotto' : 'Crea Prodotto'}
                />
            </div>
        </AuthenticatedLayout>
    );
}
