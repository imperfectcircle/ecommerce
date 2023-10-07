import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Pagination } from 'flowbite-react';
import { BiHomeAlt2 } from 'react-icons/bi';

export default function RolesIndex({ auth, roles }) {
    const confirmationHandler = (role) => {
        const confirmed = window.confirm(
            `Stai per eliminare il ruolo ${role}. Una volta eliminato alcuni utenti potrebbero perdere l'accesso ad alcune parti del sito. Sei sicuro di voler continuare?`,
        );
        if (!confirmed) {
            return false;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Lista Ruoli" />

            <h1 className="pt-[100px] text-center text-6xl">Lista Ruoli</h1>
            <div className="py-5 text-center">
                <Link
                    className="rounded-lg bg-sky-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-sky-600"
                    href={route('admin.roles.create')}
                >
                    Crea Ruolo
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
                    href={route('admin.roles.index')}
                >
                    Ruoli
                </Link>
                {'>'}
                <p>Lista Ruoli</p>
            </div>

            <div className="">
                <table className="block w-full border-separate border-spacing-4 overflow-x-scroll md:table md:overflow-x-hidden">
                    <thead className="bg-gray-200">
                        <tr className="text-center">
                            <th>Nome</th>
                            <th>Guard</th>
                            <th>Creato il</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.data.map((role) => (
                            <tr key={role.id} className="text-center">
                                <td>{role.name}</td>
                                <td>{role.guard_name}</td>
                                <td>{role.formatted_created_at}</td>

                                {role.name !== 'super admin' ? (
                                    <td className="flex flex-col space-y-3 md:flex-row md:justify-center md:space-x-3 md:space-y-0">
                                        <Link
                                            className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                            href={route(
                                                'admin.roles.edit',
                                                role,
                                            )}
                                        >
                                            Modifica
                                        </Link>
                                        <Link
                                            className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                            method="delete"
                                            as="button"
                                            onBefore={() =>
                                                confirmationHandler(role.name)
                                            }
                                            href={route(
                                                'admin.roles.destroy',
                                                role,
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
                        currentPage={roles.current_page}
                        layout="pagination"
                        nextLabel="Successivo"
                        previousLabel="Precedente"
                        onPageChange={(newPage) => {
                            router.visit(roles.links[newPage].url);
                        }}
                        showIcons
                        totalPages={roles.last_page}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
