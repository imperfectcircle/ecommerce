import TextareaGroup from '@/Components/TextareaGroup';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BiHomeAlt2 } from 'react-icons/bi';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function LegalSettings({ auth, settings }) {
    const { data, setData, patch, processing, errors } = useForm({
        refund_policy: settings.refund_policy,
        privacy_policy: settings.privacy_policy,
        terms_of_service: settings.terms_of_service,
    });

    const submit = (event) => {
        event.preventDefault();
        patch(route('admin.settings.legal.update', settings));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Impostazioni Legali" />
            <h1 className="pt-[100px] text-center text-6xl">
                Impostazioni Legali
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
                <p>Impostazioni Legali</p>
            </div>
            <form
                className="mt-10 space-y-3 rounded-lg bg-white p-10 shadow-lg"
                onSubmit={submit}
            >
                <TextareaGroup
                    name="refund_policy"
                    label="Politica di Rimborso"
                    value={data.refund_policy}
                    error={errors.refund_policy}
                    onChange={(event) =>
                        setData('refund_policy', event.target.value)
                    }
                />
                <TextareaGroup
                    className="mt-4"
                    name="privacy_policy"
                    label="Privacy Policy"
                    value={data.privacy_policy}
                    error={errors.privacy_policy}
                    onChange={(event) =>
                        setData('privacy_policy', event.target.value)
                    }
                />
                <TextareaGroup
                    className="mt-4"
                    name="terms_of_service"
                    label="Termini del Servizio"
                    value={data.terms_of_service}
                    error={errors.terms_of_service}
                    onChange={(event) =>
                        setData('terms_of_service', event.target.value)
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
