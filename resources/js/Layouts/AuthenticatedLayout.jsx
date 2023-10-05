import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiUserCircle } from 'react-icons/hi';
import { ImSwitch } from 'react-icons/im';
import { BsFire } from 'react-icons/bs';
import { AiOutlineUser, AiFillLock } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import { usePopUpVisibility } from '@/Hooks/usePopUpVisibility';
import { AnimatePresence, motion } from 'framer-motion';
import FlashMessage from '@/Components/FlashMessage';

export default function AuthenticatedLayout({ user, children }) {
    const [sidebar, setSidebar] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [popUpVisibility, togglePopUpVisibility] = usePopUpVisibility();

    return (
        <>
            <Head title="E-commerce | Pannello di Gestione" />

            <header>
                <nav className="fixed left-0 top-0 z-50 flex min-h-[100px] w-full items-center justify-end space-x-3 bg-violet-400 p-5 text-white shadow-lg">
                    <div className="">
                        <p className="text-lg">Benvenuto, {user.name}</p>
                    </div>
                    <div className="relative">
                        <HiUserCircle
                            onClick={togglePopUpVisibility}
                            className="h-10 w-10 text-white"
                        />
                        <AnimatePresence>
                            {popUpVisibility && (
                                <motion.div
                                    className="absolute -right-0 top-10 w-[200px] space-y-3 rounded-lg bg-violet-200 p-5 text-black shadow-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link
                                        className="text-lg transition-all duration-150 hover:font-bold"
                                        href={route('profile.edit')}
                                    >
                                        Profilo
                                    </Link>
                                    <Link
                                        className="flex items-center text-lg transition-all duration-150 hover:font-bold"
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                    >
                                        <ImSwitch className="mr-3" />
                                        Logout
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <GiHamburgerMenu
                        className="block text-2xl md:hidden"
                        onClick={() => setSidebar(!sidebar)}
                    />
                </nav>
            </header>
            <section className="h-screen w-full md:grid md:grid-cols-5">
                <aside className="hidden bg-violet-400 pt-40 text-xl text-white shadow-lg shadow-black md:col-span-1 md:inline-grid">
                    <div className="mx-auto flex w-2/6 flex-col items-start space-y-3">
                        <Link
                            className="flex items-center transition-all duration-150 hover:font-bold"
                            href={route('admin.dashboard')}
                        >
                            <BsFire className="mr-2" />
                            Dashboard
                        </Link>
                        <Link
                            className="flex items-center transition-all duration-150 hover:font-bold"
                            href={route('admin.users.index')}
                        >
                            <AiOutlineUser className="mr-2" />
                            Utenti
                        </Link>
                        <Link
                            className="flex items-center transition-all duration-150 hover:font-bold"
                            href={route('admin.roles.index')}
                        >
                            <AiFillLock className="mr-2" />
                            Ruoli
                        </Link>
                    </div>
                </aside>

                <main className="bg-gray-100/50 p-10 md:col-span-4">
                    {children}
                    <FlashMessage />
                </main>
            </section>

            {/* Mobile menù */}
            <div
                className={`${
                    sidebar && isMobile
                        ? 'absolute top-[100px] flex min-h-screen w-full flex-col items-center space-y-5 bg-violet-400'
                        : 'hidden'
                }`}
            >
                <Link
                    className="flex w-full items-center justify-center py-10 pl-10 text-4xl text-white transition-all duration-150 hover:bg-white hover:font-bold hover:text-black"
                    href={route('admin.dashboard')}
                >
                    <BsFire className="mr-2" />
                    Dashboard
                </Link>
                <Link
                    className="flex w-full items-center justify-center py-10 pl-10 text-4xl text-white transition-all duration-150 hover:bg-white hover:font-bold hover:text-black"
                    href={route('admin.users.index')}
                >
                    <AiOutlineUser className="mr-2" />
                    Utenti
                </Link>
                <Link
                    className="flex w-full items-center justify-center py-10 pl-10 text-4xl text-white transition-all duration-150 hover:bg-white hover:font-bold hover:text-black"
                    href={route('admin.roles.index')}
                >
                    <AiFillLock className="mr-2" />
                    Ruoli
                </Link>
            </div>
        </>
    );
}
