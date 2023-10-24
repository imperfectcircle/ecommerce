import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BiHomeAlt2 } from 'react-icons/bi';
import { Head, Link, useForm } from '@inertiajs/react';
import InputGroup from '@/Components/InputGroup';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function GeneralSettings({ auth, settings }) {
    const { data, setData, patch, processing, errors } = useForm({
        site_name: settings.site_name,
        legal_name: settings.legal_name,
        contact_email: settings.contact_email,
        sender_email: settings.sender_email,
        phone: settings.phone,
        address: settings.address,
        city: settings.city,
        country: settings.country,
        currency: settings.currency,
        currency_symbol: settings.currency_symbol,
        google_analytics_code: settings.google_analytics_code,
        active: settings.active,
    });

    const submit = (event) => {
        event.preventDefault();
        patch(route('admin.settings.general.update', settings));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Impostazioni Generali" />
            <h1 className="pt-[100px] text-center text-6xl">
                Impostazioni Generali
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
                <p>Impostazioni Generali</p>
            </div>
            <form
                className="mt-10 space-y-3 rounded-lg bg-white p-10 shadow-lg"
                onSubmit={submit}
            >
                <InputGroup
                    name="site_name"
                    label="Nome Sito"
                    value={data.site_name}
                    error={errors.site_name}
                    onChange={(event) =>
                        setData('site_name', event.target.value)
                    }
                />
                <InputGroup
                    name="legal_name"
                    label="Nome Legale del Sito"
                    value={data.legal_name}
                    error={errors.legal_name}
                    onChange={(event) =>
                        setData('legal_name', event.target.value)
                    }
                />
                <div className="flex items-center justify-center gap-5">
                    <InputGroup
                        className="w-full"
                        name="contact_email"
                        label="Email di Contatto"
                        value={data.contact_email}
                        error={errors.contact_email}
                        onChange={(event) =>
                            setData('contact_email', event.target.value)
                        }
                    />
                    <InputGroup
                        className="w-full"
                        name="sender_email"
                        label="Email Mittente"
                        value={data.sender_email}
                        error={errors.sender_email}
                        onChange={(event) =>
                            setData('sender_email', event.target.value)
                        }
                    />
                </div>
                <InputGroup
                    name="phone"
                    label="Telefono"
                    value={data.phone}
                    error={errors.phone}
                    onChange={(event) => setData('phone', event.target.value)}
                />
                <InputGroup
                    name="address"
                    label="Indirizzo"
                    value={data.address}
                    error={errors.address}
                    onChange={(event) => setData('address', event.target.value)}
                />
                <div className="flex items-center justify-center gap-5">
                    <InputGroup
                        className="w-full"
                        name="city"
                        label="Città"
                        value={data.city}
                        error={errors.city}
                        onChange={(event) =>
                            setData('city', event.target.value)
                        }
                    />
                    <InputGroup
                        className="w-full"
                        name="country"
                        label="Paese"
                        value={data.country}
                        error={errors.country}
                        onChange={(event) =>
                            setData('country', event.target.value)
                        }
                    />
                </div>
                <div className="flex items-center justify-center gap-5">
                    <InputGroup
                        className="w-full"
                        name="currency"
                        label="Valuta"
                        value={data.currency}
                        error={errors.currency}
                        onChange={(event) =>
                            setData('currency', event.target.value)
                        }
                    />
                    <InputGroup
                        className="w-full"
                        name="currency_symbol"
                        label="Simbolo Valuta"
                        value={data.currency_symbol}
                        error={errors.currency_symbol}
                        onChange={(event) =>
                            setData('currency_symbol', event.target.value)
                        }
                    />
                </div>
                <div className="mt-4">
                    <InputLabel
                        className={`text-xl ${
                            errors.google_analytics_code ? 'text-red-500' : ''
                        }`}
                        htmlFor="google_analytics_code"
                        value="Codice Google Analytics"
                    />

                    <textarea
                        rows="3"
                        className={`mt-1 block w-full resize-none rounded-md text-xl shadow-lg ${
                            errors.google_analytics_code ? 'border-red-500' : ''
                        } focus:bg-emerald-200`}
                        name="google_analytics_code"
                        id="google_analytics_code"
                        value={data.google_analytics_code}
                        onChange={(ev) =>
                            setData('google_analytics_code', ev.target.value)
                        }
                    >
                        {data.google_analytics_code}
                    </textarea>

                    <InputError
                        className="mt-2 text-xl"
                        message={errors.google_analytics_code}
                    />
                </div>
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
