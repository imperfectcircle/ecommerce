import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Pagination } from 'flowbite-react';
import { BiHomeAlt2 } from 'react-icons/bi';

export default function BrandsIndex({ auth, brands }) {
    const confirmationHandler = (brand) => {
        const confirmed = window.confirm(
            `Stai per eliminare il brand ${brand}. Sei sicuro di voler continuare?`,
        );
        if (!confirmed) {
            return false;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Lista Brand" />

            <h1 className="pt-[100px] text-center text-6xl">Lista Brand</h1>
            <div className="py-5 text-center">
                <Link
                    className="rounded-lg bg-sky-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-sky-600"
                    href={route('admin.brands.create')}
                >
                    Crea Brand
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
                    href={route('admin.brands.index')}
                >
                    Brand
                </Link>
                {'>'}
                <p>Lista Brand</p>
            </div>

            <div className="">
                <table className="block w-full border-separate border-spacing-4 overflow-x-scroll md:table md:overflow-x-hidden">
                    <thead className="bg-gray-200">
                        <tr className="text-center">
                            <th>Nome</th>
                            <th>Descrizione</th>
                            <th>Creato il</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.data.map((brand) => (
                            <tr key={brand.id} className="text-center">
                                <td>{brand.name}</td>
                                <td>
                                    {brand.description.length > 50
                                        ? `${brand.description.substring(
                                              0,
                                              50,
                                          )}...`
                                        : brand.description}
                                </td>
                                <td>{brand.formatted_created_at}</td>
                                <td className="flex flex-col space-y-3 md:flex-row md:justify-center md:space-x-3 md:space-y-0">
                                    <Link
                                        className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                        href={route('admin.brands.edit', brand)}
                                    >
                                        Modifica
                                    </Link>
                                    <Link
                                        className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                        method="delete"
                                        as="button"
                                        onBefore={() =>
                                            confirmationHandler(brand.name)
                                        }
                                        href={route(
                                            'admin.brands.destroy',
                                            brand,
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
                        currentPage={brands.current_page}
                        layout="pagination"
                        nextLabel="Successivo"
                        previousLabel="Precedente"
                        onPageChange={(newPage) => {
                            router.visit(brands.links[newPage].url);
                        }}
                        showIcons
                        totalPages={brands.last_page}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
