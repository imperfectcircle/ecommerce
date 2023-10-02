import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiUserCircle } from 'react-icons/hi';
import { ImSwitch } from 'react-icons/im';
import { BsFire } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import { usePopUpVisibility } from '@/Hooks/usePopUpVisibility';
import { AnimatePresence, motion } from 'framer-motion';

export default function AuthenticatedLayout({ user, children }) {
    const [sidebar, setSidebar] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [popUpVisibility, togglePopUpVisibility] = usePopUpVisibility();

    return (
        <>
            <Head title="E-commerce | Pannello di Gestione" />

            <header>
                <nav className="fixed left-0 top-0 flex min-h-[100px] w-full items-center justify-end space-x-3 bg-violet-400 p-5 text-white shadow-lg">
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
                    <div className="sticky top-32 space-y-3 ">
                        <Link
                            className="flex items-center pl-10 transition-all duration-150 hover:font-bold"
                            href={route('admin.dashboard')}
                        >
                            <BsFire className="mr-2" />
                            Dashboard
                        </Link>
                        <Link
                            className="flex items-center pl-10 transition-all duration-150 hover:font-bold"
                            href={route('admin.users.index')}
                        >
                            <AiOutlineUser className="mr-2" />
                            Utenti
                        </Link>
                    </div>
                </aside>

                <main className="p-10 md:col-span-4">{children}</main>
            </section>

            {/* Mobile menù */}
            <div
                className={`${
                    sidebar && isMobile
                        ? 'absolute top-[100px] min-h-screen w-full bg-violet-400'
                        : 'hidden'
                }`}
            >
                d
            </div>
        </>
    );
}

// import { useState } from 'react';
// import ApplicationLogo from '@/Components/ApplicationLogo';
// import Dropdown from '@/Components/Dropdown';
// import NavLink from '@/Components/NavLink';
// import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
// import { Link } from '@inertiajs/react';

// export default function Authenticated({ user, header, children }) {
//     const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <nav className="bg-white border-b border-gray-100">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between h-16">
//                         <div className="flex">
//                             <div className="shrink-0 flex items-center">
//                                 <Link href="/">
//                                     <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
//                                 </Link>
//                             </div>

//                             <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
//                                 <NavLink href={route('dashboard')} active={route().current('dashboard')}>
//                                     Dashboard
//                                 </NavLink>
//                             </div>
//                         </div>

//                         <div className="hidden sm:flex sm:items-center sm:ml-6">
//                             <div className="ml-3 relative">
//                                 <Dropdown>
//                                     <Dropdown.Trigger>
//                                         <span className="inline-flex rounded-md">
//                                             <button
//                                                 type="button"
//                                                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
//                                             >
//                                                 {user.name}

//                                                 <svg
//                                                     className="ml-2 -mr-0.5 h-4 w-4"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     viewBox="0 0 20 20"
//                                                     fill="currentColor"
//                                                 >
//                                                     <path
//                                                         fillRule="evenodd"
//                                                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                                         clipRule="evenodd"
//                                                     />
//                                                 </svg>
//                                             </button>
//                                         </span>
//                                     </Dropdown.Trigger>

//                                     <Dropdown.Content>
//                                         <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
//                                         <Dropdown.Link href={route('logout')} method="post" as="button">
//                                             Log Out
//                                         </Dropdown.Link>
//                                     </Dropdown.Content>
//                                 </Dropdown>
//                             </div>
//                         </div>

//                         <div className="-mr-2 flex items-center sm:hidden">
//                             <button
//                                 onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
//                                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
//                             >
//                                 <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
//                                     <path
//                                         className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M4 6h16M4 12h16M4 18h16"
//                                     />
//                                     <path
//                                         className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M6 18L18 6M6 6l12 12"
//                                     />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
//                     <div className="pt-2 pb-3 space-y-1">
//                         <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
//                             Dashboard
//                         </ResponsiveNavLink>
//                     </div>

//                     <div className="pt-4 pb-1 border-t border-gray-200">
//                         <div className="px-4">
//                             <div className="font-medium text-base text-gray-800">{user.name}</div>
//                             <div className="font-medium text-sm text-gray-500">{user.email}</div>
//                         </div>

//                         <div className="mt-3 space-y-1">
//                             <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
//                             <ResponsiveNavLink method="post" href={route('logout')} as="button">
//                                 Log Out
//                             </ResponsiveNavLink>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             {header && (
//                 <header className="bg-white shadow">
//                     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
//                 </header>
//             )}

//             <main>{children}</main>
//         </div>
//     );
// }
