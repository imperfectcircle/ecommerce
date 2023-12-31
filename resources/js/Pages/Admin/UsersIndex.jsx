import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BiHomeAlt2 } from 'react-icons/bi';
import { Head, Link, router } from '@inertiajs/react';
import { Pagination } from 'flowbite-react';

export default function UsersIndex({ auth, users }) {
    const confirmationHandler = (username) => {
        const confirmed = window.confirm(
            `Stai per eliminare l'utente ${username}. Sei sicuro di voler procedere?`,
        );
        if (!confirmed) {
            return false;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Lista Utenti" />

            <h1 className="pt-[100px] text-center text-6xl">Lista Utenti</h1>
            <div className="py-5 text-center">
                <Link
                    className="rounded-lg bg-sky-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-sky-600"
                    href={route('admin.users.create')}
                >
                    Crea Utente
                </Link>
            </div>
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
                <p>Lista Utenti</p>
            </div>

            <div className="">
                <table className="block w-full border-separate border-spacing-4 overflow-x-scroll md:table md:overflow-x-hidden">
                    <thead className="bg-gray-200">
                        <tr className="text-center">
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ruolo</th>
                            <th>Registrato il</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user) => (
                            <tr key={user.id} className="text-center">
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.roles.length > 0 ? (
                                        user.roles.map((role) => (
                                            <p key={role.id}>{role.name}</p>
                                        ))
                                    ) : (
                                        <p>Nessuno</p>
                                    )}
                                </td>
                                <td>{user.formatted_created_at}</td>
                                {user.id !== auth.user.id ? (
                                    <td className="flex flex-col space-y-3 md:flex-row md:justify-center md:space-x-3 md:space-y-0">
                                        <Link
                                            className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                            href={route(
                                                'admin.users.edit',
                                                user,
                                            )}
                                        >
                                            Modifica
                                        </Link>
                                        <Link
                                            className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                            method="delete"
                                            as="button"
                                            onBefore={() =>
                                                confirmationHandler(user.name)
                                            }
                                            href={route(
                                                'admin.users.destroy',
                                                user,
                                            )}
                                        >
                                            Elimina
                                        </Link>
                                    </td>
                                ) : (
                                    <td className="flex flex-col space-y-3 md:flex-row md:justify-center md:space-x-3 md:space-y-0">
                                        <Link
                                            className="cursor-not-allowed rounded-lg bg-emerald-500 px-5 py-2 text-white opacity-50 shadow-lg"
                                            href="#"
                                        >
                                            Modifica
                                        </Link>

                                        <button
                                            disabled
                                            className="cursor-not-allowed rounded-lg bg-red-500 px-5 py-2 text-white opacity-50 shadow-lg "
                                        >
                                            Elimina
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-5 text-center">
                    <Pagination
                        currentPage={users.current_page}
                        layout="pagination"
                        nextLabel="Successivo"
                        previousLabel="Precedente"
                        onPageChange={(newPage) => {
                            router.visit(users.links[newPage].url);
                        }}
                        showIcons
                        totalPages={users.last_page}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
