import { Link } from '@inertiajs/react';

export default function SettingCard({ title, body, url, children }) {
    return (
        <div className="flex w-full shadow-lg">
            <div className="flex items-center justify-center rounded-bl-lg rounded-tl-lg bg-violet-300 p-6 text-8xl text-white">
                {children}
            </div>
            <div className="w-full space-y-5 rounded-br-lg rounded-tr-lg bg-gray-100 p-3">
                <p className="text-xl font-bold">{title}</p>
                <p>{body}</p>
                <Link
                    href={url}
                    className="block text-sky-500 hover:text-sky-600"
                >
                    Modifica Impostazioni
                </Link>
            </div>
        </div>
    );
}
