import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BiHomeAlt2 } from 'react-icons/bi';
import { Head, Link, useForm } from '@inertiajs/react';
import InputGroup from '@/Components/InputGroup';
import PrimaryButton from '@/Components/PrimaryButton';

export default function SocialSettings({ auth, settings }) {
    const { data, setData, patch, processing, errors } = useForm({
        facebook_link: settings.facebook_link,
        instagram_link: settings.instagram_link,
        tik_tok_link: settings.tik_tok_link,
    });

    const submit = (event) => {
        event.preventDefault();
        patch(route('admin.settings.social.update', settings));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Impostazioni Social" />
            <h1 className="pt-[100px] text-center text-6xl">
                Impostazioni Social
            </h1>
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
                    href={route('admin.settings.index')}
                >
                    Impostazioni
                </Link>
                {'>'}
                <p>Impostazioni Social</p>
            </div>
            <form
                className="mt-10 space-y-3 rounded-lg bg-white p-10 shadow-lg"
                onSubmit={submit}
            >
                <InputGroup
                    name="facebook_link"
                    label="Pagina Facebook"
                    value={data.facebook_link}
                    error={errors.facebook_link}
                    onChange={(event) =>
                        setData('facebook_link', event.target.value)
                    }
                />
                <InputGroup
                    name="instagram_link"
                    label="Pagina Instagram"
                    value={data.instagram_link}
                    error={errors.instagram_link}
                    onChange={(event) =>
                        setData('instagram_link', event.target.value)
                    }
                />
                <InputGroup
                    name="tik_tok_link"
                    label="Pagina Tik Tok"
                    value={data.tik_tok_link}
                    error={errors.tik_tok_link}
                    onChange={(event) =>
                        setData('tik_tok_link', event.target.value)
                    }
                />
                <div className="mt-4 text-center">
                    <PrimaryButton
                        className="ml-4 mt-5 bg-sky-400 px-6 py-3 text-[20px] hover:bg-sky-500"
                        disabled={processing}
                    >
                        Aggiorna Impostazioni
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
