import { useForm } from '@inertiajs/react';
import InputLabel from './InputLabel';
import PrimaryButton from './PrimaryButton';
import ToggleSwitch from './ToggleSwitch';

export default function RolePermissionForm({ role, permissions }) {
    const { data, setData, post, processing, errors } = useForm({
        permissions: role.permissions.map((permission) => permission.name),
    });

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const submit = (event) => {
        event.preventDefault();

        post(route('admin.roles.permissions.assign', role));
    };

    const groupedPermissions = chunkArray(permissions, 7);

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
                    Assegna autorizzazioni dirette al ruolo
                </p>
                {groupedPermissions.map((group, _) => (
                    <div
                        key={_}
                        className="flex flex-wrap justify-center space-x-5 pt-5"
                    >
                        {group.map((permission) => (
                            <div
                                key={permission.id}
                                className="flex items-center space-x-1"
                            >
                                <InputLabel
                                    className="text-xl"
                                    htmlFor={`permissions[${permission.name}]`}
                                    value={permission.name}
                                />

                                <ToggleSwitch
                                    name={`permissions[${permission.name}]`}
                                    id={`permissions[${permission.name}]`}
                                    value={permission.name}
                                    onChange={(ev) => {
                                        const permissionName = ev.target.value;
                                        data.permissions.includes(
                                            permissionName,
                                        )
                                            ? setData(
                                                  'permissions',
                                                  data.permissions.filter(
                                                      (p) =>
                                                          p !== permissionName,
                                                  ),
                                              )
                                            : setData('permissions', [
                                                  ...data.permissions,
                                                  ev.target.value,
                                              ]);
                                    }}
                                    checked={data.permissions.includes(
                                        permission.name,
                                    )}
                                />
                            </div>
                        ))}
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
