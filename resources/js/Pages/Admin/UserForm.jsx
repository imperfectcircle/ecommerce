import { useEffect, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import PasswordInput from '@/Components/PasswordInput';
import { BiHomeAlt2 } from 'react-icons/bi';
import UserRoleForm from '@/Components/UserRoleForm';
import UserPermissionForm from '@/Components/UserPermissionForm';

export default function UserForm({ auth, user, permissions, roles }) {
    const { data, setData, post, put, processing, errors, reset } = useForm(
        user
            ? {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  password: user.password,
                  password_confirmation: '',
              }
            : {
                  name: '',
                  email: '',
                  password: '',
                  password_confirmation: '',
              },
    );

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (event) => {
        event.preventDefault();
        if (user) {
            put(route('admin.users.update', user));
            return;
        }
        post(route('admin.users.store'));
    };

    console.log(user);

    return (
        <AuthenticatedLayout user={auth.user}>
            {user ? (
                <div className="pt-[100px]">
                    <Head title="Modifica Utente" />
                    <h1 className="mt-5 pb-5 text-center text-4xl font-bold">
                        Stai modificando l'utente: {user.name}
                    </h1>
                </div>
            ) : (
                <div className="pt-[100px]">
                    <Head title="Crea Utente" />
                    <h1 className="mt-5 pb-5 text-center text-4xl font-bold">
                        Nuovo Utente
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
                    href={route('admin.users.index')}
                >
                    Utenti
                </Link>
                {'>'}
                {user ? <p>Modifica Utente</p> : <p>Crea Utente</p>}
            </div>
            {user && (
                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-5">
                    <UserRoleForm user={user} roles={roles} />
                    <UserPermissionForm user={user} permissions={permissions} />
                </div>
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
                            errors.email ? 'text-red-500' : ''
                        }`}
                        htmlFor="email"
                        value="Indirizzo Email"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`mt-1 block w-full ${
                            errors.email ? 'border-red-500' : ''
                        } focus:bg-emerald-200`}
                        autoComplete="email"
                        onChange={(event) =>
                            setData('email', event.target.value)
                        }
                        required
                    />

                    <InputError
                        className="mt-2 text-xl"
                        message={errors.email}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        className={`text-xl ${
                            errors.password ? 'text-red-500' : ''
                        }`}
                        htmlFor="password"
                        value="Password"
                    />

                    <PasswordInput
                        handleChange={(event) => {
                            setData('password', event.target.value);
                        }}
                        autoComplete="new-password"
                        placeholder=""
                        className={`${
                            errors.password ? 'border-red-500' : ''
                        } focus:bg-emerald-200`}
                    />

                    <InputError
                        className="mt-2 text-xl"
                        message={errors.password}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        className={`text-xl ${
                            errors.password_confirmation ? 'text-red-500' : ''
                        }`}
                        htmlFor="password_confirmation"
                        value="Conferma Password"
                    />

                    <PasswordInput
                        handleChange={(event) => {
                            setData(
                                'password_confirmation',
                                event.target.value,
                            );
                        }}
                        autoComplete="new-password"
                        placeholder=""
                        className={`${
                            errors.password_confirmation ? 'border-red-500' : ''
                        } focus:bg-emerald-200`}
                    />

                    <InputError
                        className="mt-2 text-xl"
                        message={errors.password_confirmation}
                    />
                </div>
                <div className="mt-4 text-center">
                    <PrimaryButton
                        className="ml-4 mt-5 bg-sky-400 px-6 py-3 text-[20px] hover:bg-sky-500"
                        disabled={processing}
                    >
                        {user ? 'Modifica Utente' : 'Crea Utente'}
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
