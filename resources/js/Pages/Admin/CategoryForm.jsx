import { Head, Link, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { BiHomeAlt2 } from 'react-icons/bi';

export default function CategoryForm({ auth, category, categories }) {
    const { data, setData, post, put, processing, errors } = useForm(
        category
            ? {
                  parent_id: category.parent_id,
                  name: category.name,
                  description: category.description,
              }
            : {
                  parent_id: '',
                  name: '',
                  description: '',
              },
    );

    const submit = (event) => {
        event.preventDefault();
        if (category) {
            put(route('admin.categories.update', category));
            return;
        }
        post(route('admin.categories.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            {category ? (
                <div className="pt-[100px]">
                    <Head title="Modifica Categoria" />
                    <h1 className="mt-5 pb-5 text-center text-4xl font-bold">
                        Stai modificando la categoria: {category.name}
                    </h1>
                </div>
            ) : (
                <div className="pt-[100px]">
                    <Head title="Crea Ruolo" />
                    <h1 className="mt-5 pb-5 text-center text-4xl font-bold">
                        Nuova Categoria
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
                    href={route('admin.categories.index')}
                >
                    Categorie
                </Link>
                {'>'}
                {category ? <p>Modifica Categoria</p> : <p>Crea Categoria</p>}
            </div>
            <form
                className="mt-10 rounded-lg bg-white p-10 shadow-lg"
                onSubmit={submit}
            >
                <div>
                    <InputLabel
                        className={`text-xl ${
                            errors.parent_id ? 'text-red-500' : ''
                        }`}
                        htmlFor="parent_id"
                        value="Categoria Padre"
                    />
                    <select
                        className="mb-3 mt-1 rounded-lg shadow-lg"
                        name="parent_id"
                        onChange={(event) =>
                            setData('parent_id', event.target.value)
                        }
                    >
                        {category
                            ? categories.map((parent) =>
                                  parent.id === category.parent_id ? (
                                      <option
                                          key={parent.id}
                                          selected
                                          value={parent.id}
                                      >
                                          {parent.name}
                                      </option>
                                  ) : (
                                      <option key={parent.id} value={parent.id}>
                                          {parent.name}
                                      </option>
                                  ),
                              )
                            : categories.map((category) => (
                                  <option key={category.id} value={category.id}>
                                      {category.name}
                                  </option>
                              ))}
                    </select>
                </div>

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
                        {category ? 'Modifica Categoria' : 'Crea Categoria'}
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
