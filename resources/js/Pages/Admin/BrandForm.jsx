import { Head, Link, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { BiHomeAlt2 } from 'react-icons/bi';

export default function BrandForm({ auth, brand }) {
    const { data, setData, post, put, processing, errors } = useForm(
        brand
            ? {
                  name: brand.name,
                  description: brand.description,
              }
            : {
                  name: '',
                  description: '',
              },
    );

    const submit = (event) => {
        event.preventDefault();
        if (brand) {
            put(route('admin.brands.update', brand));
            return;
        }
        post(route('admin.brands.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            {brand ? (
                <div className="pt-[100px]">
                    <Head title="Modifica Brand" />
                    <h1 className="mt-5 pb-5 text-center text-4xl font-bold">
                        Stai modificando il brand: {brand.name}
                    </h1>
                </div>
            ) : (
                <div className="pt-[100px]">
                    <Head title="Crea Brand" />
                    <h1 className="mt-5 pb-5 text-center text-4xl font-bold">
                        Nuovo Brand
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
                    href={route('admin.brands.index')}
                >
                    Brand
                </Link>
                {'>'}
                {brand ? <p>Modifica Brand</p> : <p>Crea Brand</p>}
            </div>
            <form
                className="mt-10 rounded-lg bg-white p-10 shadow-lg"
                onSubmit={submit}
            >
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
                            errors.description ? 'border-red-500' : ''
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
                <div className="mt-4 text-center">
                    <PrimaryButton
                        className="ml-4 mt-5 bg-sky-400 px-6 py-3 text-[20px] hover:bg-sky-500"
                        disabled={processing}
                    >
                        {brand ? 'Modifica Brand' : 'Crea Brand'}
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
