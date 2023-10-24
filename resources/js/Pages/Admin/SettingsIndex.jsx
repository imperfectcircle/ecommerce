import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BiHomeAlt2 } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { TiSocialAtCircular } from 'react-icons/ti';
import { Head, Link } from '@inertiajs/react';
import SettingCard from '@/Components/SettingCard';

export default function SettingsIndex({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Impostazioni" />
            <h1 className="pt-[100px] text-center text-6xl">Impostazioni</h1>
            <div className="flex space-x-2 py-5">
                <Link
                    className="flex items-center underline transition-all duration-150 hover:text-red-500"
                    href={route('admin.dashboard')}
                >
                    <BiHomeAlt2 /> Dashboard
                </Link>
                {'>'}
                <p>Lista Categorie</p>
            </div>
            <div className="mt-5 grid grid-cols-1 space-y-5 md:grid-cols-2 md:gap-10">
                <SettingCard
                    title={'Generali'}
                    body={
                        'Impostazioni generali come: Titolo, Descrizione, Indirizzo...'
                    }
                    url={route('admin.settings.general.show')}
                >
                    <BsGear />
                </SettingCard>
                <SettingCard
                    title={'Legali'}
                    body={
                        'Impostazioni legali come: Termini del Servizio e Informativa sulla Privacy'
                    }
                    url={'#'}
                >
                    <MdOutlinePrivacyTip />
                </SettingCard>
                <SettingCard
                    title={'Social Network'}
                    body={
                        'Impostazioni dei Social Network: I tuoi account social'
                    }
                    url={'#'}
                >
                    <TiSocialAtCircular />
                </SettingCard>
            </div>
        </AuthenticatedLayout>
    );
}
