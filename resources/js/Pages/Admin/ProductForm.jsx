import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import ToggleSwitch from '@/Components/ToggleSwitch';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { BiHomeAlt2 } from 'react-icons/bi';
import { AnimatePresence, motion } from 'framer-motion';
import ImageUploader from '@/Components/ImageUploader';
import { Hourglass } from 'react-loader-spinner';
import { router } from '@inertiajs/react';
import OptionsForm from '@/Components/OptionsForm';
import VariationsForm from '@/Components/VariationsForm';

export default function ProductForm({ auth, product, categories }) {
    const { flash } = usePage().props;
    const option = flash.option;
    const variation = flash.variations;
    const { data, setData, post, processing, errors } = useForm(
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
                  category_id: product.category_id,
                  canonical_url: product.canonical_url,
                  seo_title: product.seo_title,
                  seo_description: product.seo_description,
                  seo_keywords: product.seo_keywords,
                  _method: 'put',
                  images: [],
              }
            : {
                  name: '',
                  description: '',
                  sku: '',
                  price: '',
                  discounted_price: '',
                  cost: '',
                  quantity: '',
                  track_quantity: true,
                  sell_out_of_stock: false,
                  status: '',
                  category_id: '',
                  canonical_url: '',
                  seo_title: '',
                  seo_description: '',
                  seo_keywords: '',
                  variations: [],
                  options: [],
                  images: [],
              },
    );

    useEffect(() => {
        if (option !== null) data.options.push(option.id);
    }, [option]);

    useEffect(() => {
        if (variation !== null) {
            variation.forEach((el) => {
                data.variations.push(el.id);
            });
        }
    }, [variation]);

    const [quantityVisibility, setQuantityVisibility] = useState(
        data.track_quantity,
    );

    const [optionsForm, setOptionsForm] = useState(false);

    const handleOptionsForm = () => setOptionsForm(!optionsForm);

    const submit = (event) => {
        event.preventDefault();
        if (product) {
            router.post(`/admin/products/${product.id}`, data);
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
            {!processing ? (
                <>
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
                        {product ? (
                            <p>Modifica Prodotto</p>
                        ) : (
                            <p>Crea Prodotto</p>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="w-full rounded-b-lg shadow-lg">
                            <div className="rounded-t-lg bg-violet-200 p-5 ">
                                <p className="text-xl">Informazioni Prodotto</p>
                            </div>
                            <div className="p-5">
                                {/* Informazioni Prodotto */}
                                <form id="productForm" onSubmit={submit}>
                                    <div>
                                        <InputLabel
                                            className={`text-xl ${
                                                errors.name
                                                    ? 'text-red-500'
                                                    : ''
                                            }`}
                                            htmlFor="name"
                                            value="Nome"
                                        />

                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className={`mt-1 block w-full ${
                                                errors.name
                                                    ? 'border-red-500'
                                                    : ''
                                            } focus:bg-emerald-200`}
                                            autoComplete="off"
                                            onChange={(event) =>
                                                setData(
                                                    'name',
                                                    event.target.value,
                                                )
                                            }
                                        />

                                        <InputError
                                            className="mt-2 text-xl"
                                            message={errors.name}
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            className={`text-xl ${
                                                errors.description
                                                    ? 'text-red-500'
                                                    : ''
                                            }`}
                                            htmlFor="description"
                                            value="Descrizione"
                                        />

                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={data.description}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setData('description', data);
                                            }}
                                        />
                                        <InputError
                                            className="mt-2 text-xl"
                                            message={errors.description}
                                        />
                                    </div>
                                </form>
                                {/* Informazioni Prodotto */}
                            </div>
                        </div>
                        <div className="w-full rounded-b-lg shadow-lg">
                            <div className="rounded-t-lg bg-violet-200 p-5 ">
                                <p className="text-xl">Immagini</p>
                            </div>
                            <div className="p-5">
                                {/* Immagini */}
                                <ImageUploader
                                    setData={setData}
                                    data={data}
                                    className="mt-2 rounded-lg border border-gray-400 bg-gray-100 p-16 text-center shadow-lg"
                                />
                                {/* Immagini */}
                            </div>
                        </div>
                        <div className="w-full rounded-b-lg shadow-lg">
                            <div className="rounded-t-lg bg-violet-200 p-5 ">
                                <p className="text-xl">Dettagli Prezzi</p>
                            </div>
                            <div className="p-5">
                                {/* Prezzi */}
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <InputLabel
                                            className={`text-xl ${
                                                errors.price
                                                    ? 'text-red-500'
                                                    : ''
                                            }`}
                                            htmlFor="price"
                                            value="Prezzo"
                                        />

                                        <div className="mt-1 flex">
                                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-black bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                                                <p className="text-lg">€</p>
                                            </span>
                                            <input
                                                form="productForm"
                                                type="text"
                                                id="price"
                                                name="price"
                                                placeholder="0.00"
                                                value={data.price}
                                                className={`block w-full min-w-0 flex-1 rounded-none rounded-r-lg border-l-0 p-3 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 ${
                                                    errors.price
                                                        ? 'border-red-500'
                                                        : ''
                                                } focus:bg-emerald-200`}
                                                autoComplete="off"
                                                onChange={(event) =>
                                                    setData(
                                                        'price',
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        </div>

                                        <InputError
                                            className="mt-2 text-xl"
                                            message={errors.price}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            className={`text-xl ${
                                                errors.discounted_price
                                                    ? 'text-red-500'
                                                    : ''
                                            }`}
                                            htmlFor="discounted_price"
                                            value="Prezzo Scontato"
                                        />

                                        <div className="mt-1 flex">
                                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-black bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                                                <p className="text-lg">€</p>
                                            </span>
                                            <input
                                                form="productForm"
                                                type="text"
                                                id="discounted_price"
                                                name="discounted_price"
                                                placeholder="0.00"
                                                value={data.discounted_price}
                                                className={`block w-full min-w-0 flex-1 rounded-none rounded-r-lg border-l-0 p-3 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 ${
                                                    errors.discounted_price
                                                        ? 'border-red-500'
                                                        : ''
                                                } focus:bg-emerald-200`}
                                                autoComplete="off"
                                                onChange={(event) =>
                                                    setData(
                                                        'discounted_price',
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        </div>

                                        <InputError
                                            className="mt-2 text-xl"
                                            message={errors.discounted_price}
                                        />
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <InputLabel
                                        className={`text-xl ${
                                            errors.cost ? 'text-red-500' : ''
                                        }`}
                                        htmlFor="cost"
                                        value="Costo per Articolo"
                                    />

                                    <div className="mt-1 flex">
                                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-black bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                                            <p className="text-lg">€</p>
                                        </span>
                                        <input
                                            form="productForm"
                                            type="text"
                                            id="cost"
                                            name="cost"
                                            placeholder="0.00"
                                            value={data.cost}
                                            className={`block w-full min-w-0 flex-1 rounded-none rounded-r-lg border-l-0 p-3 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 ${
                                                errors.cost
                                                    ? 'border-red-500'
                                                    : ''
                                            } focus:bg-emerald-200`}
                                            autoComplete="off"
                                            onChange={(event) =>
                                                setData(
                                                    'cost',
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <InputError
                                        className="mt-2 text-xl"
                                        message={errors.cost}
                                    />
                                </div>
                                <span className="mt-2 block ">
                                    Non sarà visibile ai clienti
                                </span>
                                {/* Prezzi */}
                            </div>
                        </div>
                        <div className="w-full rounded-b-lg shadow-lg">
                            <div className="rounded-t-lg bg-violet-200 p-5 ">
                                <p className="text-xl">Inventario</p>
                            </div>
                            <div className="p-5">
                                {/* Inventario */}

                                <div>
                                    <InputLabel
                                        className={`text-xl ${
                                            errors.sku ? 'text-red-500' : ''
                                        }`}
                                        htmlFor="sku"
                                        value="Codice Articolo"
                                    />

                                    <TextInput
                                        id="sku"
                                        name="sku"
                                        form="productForm"
                                        value={data.sku}
                                        className={`mt-1 block w-full ${
                                            errors.sku ? 'border-red-500' : ''
                                        } focus:bg-emerald-200`}
                                        autoComplete="off"
                                        onChange={(event) =>
                                            setData('sku', event.target.value)
                                        }
                                    />

                                    <InputError
                                        className="mt-2 text-xl"
                                        message={errors.sku}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="mt-14 flex items-center space-x-3">
                                        <InputLabel
                                            className="text-xl"
                                            htmlFor="track_quantity"
                                            value="Traccia Quantità"
                                        />

                                        <ToggleSwitch
                                            name="track_quantity"
                                            id="track_quantity"
                                            form="productForm"
                                            value={data.track_quantity}
                                            onChange={(ev) => {
                                                setData(
                                                    'track_quantity',
                                                    ev.target.checked,
                                                );
                                                setQuantityVisibility(
                                                    !quantityVisibility,
                                                );
                                            }}
                                            checked={data.track_quantity}
                                        />
                                    </div>
                                    <AnimatePresence>
                                        {quantityVisibility && (
                                            <motion.div
                                                className="mt-5"
                                                initial={{
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                }}
                                            >
                                                <InputLabel
                                                    className={`text-xl ${
                                                        errors.quantity
                                                            ? 'text-red-500'
                                                            : ''
                                                    }`}
                                                    htmlFor="quantity"
                                                    value="Quantità"
                                                />

                                                <TextInput
                                                    id="quantity"
                                                    name="quantity"
                                                    form="productForm"
                                                    value={data.quantity}
                                                    className={`mt-1 block w-full ${
                                                        errors.quantity
                                                            ? 'border-red-500'
                                                            : ''
                                                    } focus:bg-emerald-200`}
                                                    autoComplete="off"
                                                    onChange={(event) =>
                                                        setData(
                                                            'quantity',
                                                            event.target.value,
                                                        )
                                                    }
                                                />

                                                <InputError
                                                    className="mt-2 text-xl"
                                                    message={errors.quantity}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="mt-5 flex items-center space-x-3">
                                    <InputLabel
                                        className="text-xl"
                                        htmlFor="sell_out_of_stock"
                                        value="Esaurito"
                                    />

                                    <ToggleSwitch
                                        name="sell_out_of_stock"
                                        id="sell_out_of_stock"
                                        form="productForm"
                                        value={data.sell_out_of_stock}
                                        onChange={(ev) => {
                                            setData(
                                                'sell_out_of_stock',
                                                ev.target.checked,
                                            );
                                        }}
                                        checked={data.sell_out_of_stock}
                                    />
                                </div>
                                {/* Inventario */}
                            </div>
                        </div>

                        {!product && (
                            <div className="w-full rounded-b-lg shadow-lg">
                                <div className="rounded-t-lg bg-violet-200 p-5 ">
                                    <p className="text-xl">Opzioni</p>
                                </div>
                                <div className="p-5">
                                    {/* Opzioni */}
                                    <div className="mt-2 flex items-center space-x-3">
                                        <InputLabel
                                            className="text-xl"
                                            htmlFor="optionsCheckbox"
                                            value="Questo prodotto ha opzioni come taglia o colore"
                                        />

                                        <ToggleSwitch
                                            name="optionsCheckbox"
                                            id="optionsCheckbox"
                                            onChange={handleOptionsForm}
                                        />
                                    </div>
                                    <div className="mt-5">
                                        {optionsForm && (
                                            <OptionsForm product={product} />
                                        )}
                                    </div>
                                    {/* Opzioni */}
                                </div>
                            </div>
                        )}

                        <div className="w-full rounded-b-lg shadow-lg">
                            <div className="rounded-t-lg bg-violet-200 p-5 ">
                                <p className="text-xl">Varianti</p>
                            </div>
                            {variation && (
                                <div className="p-5">
                                    {/* Varianti */}
                                    <VariationsForm variations={variation} />
                                    {/* Varianti */}
                                </div>
                            )}
                        </div>
                        <div className="w-full rounded-b-lg shadow-lg">
                            <div className="rounded-t-lg bg-violet-200 p-5 ">
                                <p className="text-xl">SEO</p>
                            </div>
                            <div className="space-y-5 p-5">
                                {/* SEO */}
                                <div>
                                    <InputLabel
                                        className={`text-xl ${
                                            errors.canonical_url
                                                ? 'text-red-500'
                                                : ''
                                        }`}
                                        htmlFor="canonical_url"
                                        value="URL Canonica"
                                    />

                                    <TextInput
                                        id="canonical_url"
                                        name="canonical_url"
                                        form="productForm"
                                        placeholder="https://miosito.it"
                                        value={data.canonical_url}
                                        className={`mt-1 block w-full ${
                                            errors.canonical_url
                                                ? 'border-red-500'
                                                : ''
                                        } focus:bg-emerald-200`}
                                        autoComplete="off"
                                        onChange={(event) =>
                                            setData(
                                                'canonical_url',
                                                event.target.value,
                                            )
                                        }
                                    />

                                    <InputError
                                        className="mt-2 text-xl"
                                        message={errors.canonical_url}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        className={`text-xl ${
                                            errors.seo_title
                                                ? 'text-red-500'
                                                : ''
                                        }`}
                                        htmlFor="seo_title"
                                        value="Titolo SEO"
                                    />

                                    <TextInput
                                        id="seo_title"
                                        name="seo_title"
                                        form="productForm"
                                        value={data.seo_title}
                                        className={`mt-1 block w-full ${
                                            errors.seo_title
                                                ? 'border-red-500'
                                                : ''
                                        } focus:bg-emerald-200`}
                                        autoComplete="off"
                                        onChange={(event) =>
                                            setData(
                                                'seo_title',
                                                event.target.value,
                                            )
                                        }
                                    />

                                    <InputError
                                        className="mt-2 text-xl"
                                        message={errors.seo_title}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        className={`text-xl ${
                                            errors.seo_description
                                                ? 'text-red-500'
                                                : ''
                                        }`}
                                        htmlFor="seo_description"
                                        value="Descrizione SEO"
                                    />

                                    <textarea
                                        rows="2"
                                        form="productForm"
                                        className={`mt-1 block w-full resize-none rounded-md text-xl shadow-lg ${
                                            errors.seo_description
                                                ? 'border-red-500'
                                                : ''
                                        } focus:bg-emerald-200`}
                                        name="seo_description"
                                        id="seo_description"
                                        value={data.seo_description}
                                        onChange={(ev) =>
                                            setData(
                                                'seo_description',
                                                ev.target.value,
                                            )
                                        }
                                    >
                                        {data.seo_description}
                                    </textarea>

                                    <InputError
                                        className="mt-2 text-xl"
                                        message={errors.seo_description}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        className={`text-xl ${
                                            errors.seo_keywords
                                                ? 'text-red-500'
                                                : ''
                                        }`}
                                        htmlFor="seo_keywords"
                                        value="Parole Chiave"
                                    />

                                    <TextInput
                                        id="seo_keywords"
                                        name="seo_keywords"
                                        form="productForm"
                                        value={data.seo_keywords}
                                        className={`mt-1 block w-full ${
                                            errors.seo_keywords
                                                ? 'border-red-500'
                                                : ''
                                        } focus:bg-emerald-200`}
                                        autoComplete="off"
                                        onChange={(event) =>
                                            setData(
                                                'seo_keywords',
                                                event.target.value,
                                            )
                                        }
                                    />

                                    <InputError
                                        className="mt-2 text-xl"
                                        message={errors.seo_keywords}
                                    />
                                </div>
                                {/* SEO */}
                            </div>
                        </div>
                        <div className="w-full rounded-b-lg shadow-lg">
                            <div className="rounded-t-lg bg-violet-200 p-5 ">
                                <p className="text-xl">Stato del Prodotto</p>
                            </div>
                            <div className="p-5">
                                {/* Stato del Prodotto */}
                                <div className="flex items-center gap-10">
                                    <div className="">
                                        <InputLabel
                                            className={`text-xl ${
                                                errors.status
                                                    ? 'text-red-500'
                                                    : ''
                                            }`}
                                            htmlFor="status"
                                            value="Stato"
                                        />
                                        <select
                                            className="mb-3 mt-1 rounded-lg shadow-lg"
                                            name="status"
                                            id="status"
                                            value={data.status}
                                            form="productForm"
                                            onChange={(event) =>
                                                setData(
                                                    'status',
                                                    event.target.value,
                                                )
                                            }
                                        >
                                            <option value="">
                                                -- Scegli uno Stato --
                                            </option>
                                            <option value="draft">Bozza</option>
                                            <option value="review">
                                                Revisione
                                            </option>
                                            <option value="active">
                                                Pubblicato
                                            </option>
                                        </select>
                                    </div>
                                    <div className="flex items-center">
                                        <div
                                            className={`h-3 rounded-full p-3 ${
                                                data.status === 'draft'
                                                    ? 'bg-red-500'
                                                    : data.status === 'review'
                                                    ? 'bg-amber-500'
                                                    : data.status === 'active'
                                                    ? 'bg-emerald-500'
                                                    : ''
                                            }`}
                                        ></div>
                                        <p className="pl-1 text-lg">
                                            {data.status === 'draft'
                                                ? 'Bozza'
                                                : data.status === 'review'
                                                ? 'Revisione'
                                                : data.status === 'active'
                                                ? 'Pubblicato'
                                                : ''}
                                        </p>
                                    </div>
                                </div>
                                <InputError
                                    className="mt-2 text-xl"
                                    message={errors.status}
                                />
                                {/* Stato del Prodotto */}
                            </div>
                        </div>
                        <div className="w-full rounded-b-lg shadow-lg">
                            <div className="rounded-t-lg bg-violet-200 p-5 ">
                                <p className="text-xl">
                                    Categoria del Prodotto
                                </p>
                            </div>
                            <div className="p-5">
                                {/* Categoria del Prodotto */}
                                <div className="">
                                    <div className="">
                                        <InputLabel
                                            className={`text-xl ${
                                                errors.category_id
                                                    ? 'text-red-500'
                                                    : ''
                                            }`}
                                            htmlFor="category_id"
                                            value="Categoria di Appartenenza"
                                        />
                                        <select
                                            className="mb-3 mt-1 w-full rounded-lg shadow-lg"
                                            name="category_id"
                                            id="category_id"
                                            form="productForm"
                                            value={data.category_id}
                                            onChange={(event) =>
                                                setData(
                                                    'category_id',
                                                    event.target.value,
                                                )
                                            }
                                        >
                                            <option value="">
                                                -- Scegli una categoria --
                                            </option>
                                            {categories.map((category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            className="mt-2 text-xl"
                                            message={errors.category_id}
                                        />
                                    </div>
                                </div>
                                {/* Categoria del Prodotto */}
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 text-center">
                        <input
                            type="submit"
                            disabled={processing}
                            className={`ml-4 mt-5 inline-flex items-center rounded-md border border-transparent bg-sky-400 px-6 py-3 text-[20px] text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-sky-500 focus:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-sky-900 ${
                                processing && 'bg-gray-500 opacity-25'
                            }`}
                            form="productForm"
                            value={
                                product ? 'Modifica Prodotto' : 'Crea Prodotto'
                            }
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="text-center">
                        <p className="py-5 text-4xl">
                            Stiamo caricando i dati e le immagini.
                        </p>
                        <p className="text-4xl">
                            Attendi, ci potrebbe volere un po'.
                        </p>
                    </div>
                    <div className="grid h-[600px] place-items-center">
                        <Hourglass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            colors={['#A78BFA', '#DDD6FE']}
                        />
                    </div>
                </>
            )}
        </AuthenticatedLayout>
    );
}
