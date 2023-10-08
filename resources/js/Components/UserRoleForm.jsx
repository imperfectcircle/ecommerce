import { useForm } from '@inertiajs/react';
import InputLabel from './InputLabel';
import PrimaryButton from './PrimaryButton';
import ToggleSwitch from './ToggleSwitch';

export default function UserRoleForm({ user, roles }) {
    const { data, setData, post, processing, errors } = useForm({
        roles: user.roles.map((role) => role.name),
    });

    const submit = (event) => {
        event.preventDefault();

        post(route('admin.users.roles.assign', user));
    };

    return (
        <>
            <form
                className="mt-10 rounded-lg bg-white px-10 py-5 shadow-lg"
                onSubmit={submit}
            >
                <h2 className="p-2 text-center text-4xl font-bold">Ruoli</h2>
                <p className="p-2 text-center text-xl">
                    Assegna ruoli all'utente
                </p>
                {roles.map((role) => (
                    <div key={role.id} className="flex items-center space-x-3">
                        <InputLabel
                            className="text-xl"
                            htmlFor={`roles[${role.name}]`}
                            value={role.name}
                        />

                        <ToggleSwitch
                            name={`roles[${role.name}]`}
                            id={`roles[${role.name}]`}
                            value={role.name}
                            onChange={(ev) => {
                                const roleName = ev.target.value;
                                data.roles.includes(roleName)
                                    ? setData(
                                          'roles',
                                          data.roles.filter(
                                              (r) => r !== roleName,
                                          ),
                                      )
                                    : setData('roles', [
                                          ...data.roles,
                                          ev.target.value,
                                      ]);
                            }}
                            checked={data.roles.includes(role.name)}
                        />
                    </div>
                ))}

                <div className="text-center">
                    <PrimaryButton
                        className="ml-4 mt-5 bg-sky-400 px-6 py-3 text-[20px] hover:bg-sky-500"
                        disabled={processing}
                    >
                        Imposta Ruolo
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}
