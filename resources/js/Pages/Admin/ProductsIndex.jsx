import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Pagination } from 'flowbite-react';
import { BiHomeAlt2 } from 'react-icons/bi';

export default function RolesIndex({ auth, products }) {
    const confirmationHandler = (product) => {
        const confirmed = window.confirm(
            `Stai per eliminare il prodotto ${product}. Sei sicuro di voler continuare?`,
        );
        if (!confirmed) {
            return false;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Lista Prodotti" />

            <h1 className="pt-[100px] text-center text-6xl">Lista Prodotti</h1>
            <div className="py-5 text-center">
                <Link
                    className="rounded-lg bg-sky-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-sky-600"
                    href={route('admin.products.create')}
                >
                    Crea Prodotto
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
                    href={route('admin.products.index')}
                >
                    Prodotti
                </Link>
                {'>'}
                <p>Lista Prodotti</p>
            </div>

            <div className="">
                <table className="block w-full border-separate border-spacing-4 overflow-x-scroll md:table md:overflow-x-hidden">
                    <thead className="bg-gray-200">
                        <tr className="text-center">
                            <th>Codice Articolo</th>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Creato il</th>
                            <th>Stato</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.data.map((product) => (
                            <tr key={product.id} className="text-center">
                                <td>{product.sku}</td>
                                <td>{product.name}</td>
                                <td>{product.category.name}</td>
                                <td>{product.formatted_created_at}</td>
                                <td>
                                    {product.status === 'draft'
                                        ? 'Bozza'
                                        : product.status === 'review'
                                        ? 'Revisione'
                                        : 'Pubblicato'}
                                </td>

                                <td className="flex flex-col space-y-3 md:flex-row md:justify-center md:space-x-3 md:space-y-0">
                                    <Link
                                        className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                        href={route(
                                            'admin.products.edit',
                                            product,
                                        )}
                                    >
                                        Modifica
                                    </Link>
                                    <Link
                                        className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                        method="delete"
                                        as="button"
                                        onBefore={() =>
                                            confirmationHandler(product.name)
                                        }
                                        href={route(
                                            'admin.products.destroy',
                                            product,
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
                        currentPage={products.current_page}
                        layout="pagination"
                        nextLabel="Successivo"
                        previousLabel="Precedente"
                        onPageChange={(newPage) => {
                            router.visit(products.links[newPage].url);
                        }}
                        showIcons
                        totalPages={products.last_page}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
