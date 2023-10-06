import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BiHomeAlt2 } from 'react-icons/bi';
import { Head, Link, router } from '@inertiajs/react';
import { Pagination } from 'flowbite-react';

export default function UsersIndex({ auth, categories }) {
    const confirmationHandler = (name) => {
        const confirmed = window.confirm(
            `Stai per eliminare la categoria ${name}. Sei sicuro di voler procedere?`,
        );
        if (!confirmed) {
            return false;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Lista Utenti" />

            <h1 className="pt-[100px] text-center text-6xl">Lista Categorie</h1>
            <div className="py-5 text-center">
                <Link
                    className="rounded-lg bg-sky-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-sky-600"
                    href={route('admin.categories.create')}
                >
                    Crea Categoria
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
                    href={route('admin.categories.index')}
                >
                    Categorie
                </Link>
                {'>'}
                <p>Lista Categorie</p>
            </div>

            <div className="overflow-x">
                <table className="w-full border-separate border-spacing-4 overflow-scroll">
                    <thead className="bg-gray-200">
                        <tr className="text-center">
                            <th>Nome</th>
                            <th>Descrizione</th>
                            <th>Categoria Padre</th>
                            <th>Creata il</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.data.map((category) => (
                            <tr key={category.id} className="text-center">
                                <td>{category.name}</td>
                                <td>
                                    {category.description.length > 50
                                        ? `${category.description.substring(
                                              0,
                                              50,
                                          )}...`
                                        : category.description}
                                </td>
                                <td>{category.parent.name}</td>
                                <td>{category.formatted_created_at}</td>

                                <td className="flex flex-col space-y-3 md:flex-row md:justify-center md:space-x-3 md:space-y-0">
                                    <Link
                                        className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                        href={route(
                                            'admin.categories.edit',
                                            category,
                                        )}
                                    >
                                        Modifica
                                    </Link>
                                    <Link
                                        className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                        method="delete"
                                        as="button"
                                        onBefore={() =>
                                            confirmationHandler(category.name)
                                        }
                                        href={route(
                                            'admin.categories.destroy',
                                            category,
                                        )}
                                    >
                                        Elimina
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-5 text-center">
                    <Pagination
                        currentPage={categories.current_page}
                        layout="pagination"
                        nextLabel="Successivo"
                        previousLabel="Precedente"
                        onPageChange={(newPage) => {
                            router.visit(categories.links[newPage].url);
                        }}
                        showIcons
                        totalPages={categories.last_page}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
