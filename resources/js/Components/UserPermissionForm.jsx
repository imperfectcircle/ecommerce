import { useForm } from '@inertiajs/react';
import InputLabel from './InputLabel';
import PrimaryButton from './PrimaryButton';

export default function UserPermissionForm({ user, permissions }) {
    const { data, setData, post, processing, errors } = useForm({
        permissions: user.permissions.map((permission) => permission.name),
    });

    const submit = (event) => {
        event.preventDefault();

        post(route('admin.users.permissions.assign', user));
    };

    return (
        <>
            <form
                className="mt-10 rounded-lg bg-white px-10 py-5 shadow-lg"
                onSubmit={submit}
            >
                <h2 className="p-2 text-center text-4xl font-bold">
                    Autorizzazioni
                </h2>
                <p className="p-2 text-center text-xl">
                    Assegna autorizzazioni dirette all'utente non ereditate dai
                    ruoli
                </p>
                {permissions.map((permission) => (
                    <div
                        key={permission.id}
                        className="flex items-center space-x-3"
                    >
                        <InputLabel
                            className="text-xl"
                            htmlFor={`permissions[${permission.name}]`}
                            value={`${permission.name}s`}
                        />

                        <input
                            type="checkbox"
                            name={`permissions[${permission.name}]`}
                            id={`permissions[${permission.name}]`}
                            value={permission.name}
                            onChange={(ev) => {
                                const permissionName = ev.target.value;
                                data.permissions.includes(permissionName)
                                    ? setData(
                                          'permissions',
                                          data.permissions.filter(
                                              (p) => p !== permissionName,
                                          ),
                                      )
                                    : setData('permissions', [
                                          ...data.permissions,
                                          ev.target.value,
                                      ]);
                            }}
                            checked={data.permissions.includes(permission.name)}
                        />
                    </div>
                ))}

                <div className="text-center">
                    <PrimaryButton
                        className="ml-4 mt-5 bg-sky-400 px-6 py-3 text-[20px] hover:bg-sky-500"
                        disabled={processing}
                    >
                        Imposta Autorizzazioni
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}
