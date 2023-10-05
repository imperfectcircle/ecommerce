import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { BiHomeAlt2 } from 'react-icons/bi';
import RolePermissionForm from '@/Components/RolePermissionForm';

export default function UserForm({ auth, role, permissions }) {
    const { data, setData, post, put, processing, errors } = useForm(
        role
            ? {
                  id: role.id,
                  name: role.name,
                  guard: role.guard_name,
              }
            : {
                  name: '',
                  guard: '',
              },
    );

    console.log(role);

    const submit = (event) => {
        event.preventDefault();
        if (role) {
            put(route('admin.roles.update', role));
            return;
        }
        post(route('admin.roles.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            {role ? (
                <div className="pt-[100px]">
                    <Head title="Modifica Ruolo" />
                    <h1 className="mt-5 pb-5 text-center text-4xl font-bold">
                        Stai modificando il ruolo: {role.name}
                    </h1>
                </div>
            ) : (
                <div className="pt-[100px]">
                    <Head title="Crea Ruolo" />
                    <h1 className="mt-5 pb-5 text-center text-4xl font-bold">
                        Nuovo Ruolo
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
                    href={route('admin.roles.index')}
                >
                    Ruoli
                </Link>
                {'>'}
                {role ? <p>Modifica Ruolo</p> : <p>Crea Ruolo</p>}
            </div>
            {role && (
                <RolePermissionForm role={role} permissions={permissions} />
            )}
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
                        autoComplete="username"
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
                            errors.guard ? 'text-red-500' : ''
                        }`}
                        htmlFor="guard"
                        value="Guard"
                    />

                    <TextInput
                        id="guard"
                        type="text"
                        name="guard"
                        value={data.guard}
                        className={`mt-1 block w-full ${
                            errors.guard ? 'border-red-500' : ''
                        } focus:bg-emerald-200`}
                        autoComplete="off"
                        onChange={(event) =>
                            setData('guard', event.target.value)
                        }
                    />

                    <InputError
                        className="mt-2 text-xl"
                        message={errors.guard}
                    />
                </div>
                <div className="mt-4 text-center">
                    <PrimaryButton
                        className="ml-4 mt-5 bg-sky-400 px-6 py-3 text-[20px] hover:bg-sky-500"
                        disabled={processing}
                    >
                        {role ? 'Modifica Ruolo' : 'Crea Ruolo'}
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
