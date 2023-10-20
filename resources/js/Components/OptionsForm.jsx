import { useForm } from '@inertiajs/react';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import { FaPlus } from 'react-icons/fa';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { useState } from 'react';

export default function OptionsForm() {
    const { data, setData, post, processing } = useForm({
        option: { name: '', value: '', values: [] },
        _method: 'put',
    });

    const [nameDisabled, setNameDisabled] = useState(false);

    const addValue = () => {
        const newData = { ...data };
        newData.option.name = data.option.name;
        newData.option.values.push(data.option.value);
        newData.option.value = '';
        setData(newData);
        setNameDisabled(true);
    };

    const deleteValue = (index) => {
        const newData = { ...data };
        newData.option.values.splice(index, 1);
        setData(newData);
    };

    const submit = (event) => {
        event.preventDefault();
        post(route('admin.options.store'));
        setNameDisabled(false);
        setData({ option: { name: '', value: '', values: [] } });
    };

    return (
        <div>
            <form className="space-y-3" id="optionForm" onSubmit={submit}>
                <div>
                    <InputLabel
                        className="text-xl"
                        htmlFor="option_name"
                        value="Tipo"
                    />
                    <TextInput
                        id="option_name"
                        name="option_name"
                        value={data.option.name}
                        placeholder="Colore, Taglia..."
                        className={`mt-1 block w-full focus:bg-emerald-200 ${
                            nameDisabled ? 'bg-gray-200' : ''
                        }`}
                        autoComplete="off"
                        disabled={nameDisabled}
                        onChange={(e) =>
                            setData({
                                option: {
                                    name: e.target.value,
                                    values: data.option.values,
                                },
                            })
                        }
                    />
                </div>
                <div>
                    <InputLabel
                        className="text-xl"
                        htmlFor="option_value"
                        value="Valore"
                    />

                    <TextInput
                        id="option_value"
                        name="option_value"
                        value={data.option.value}
                        placeholder="Rosso, XL..."
                        className="mt-1 block w-full focus:bg-emerald-200"
                        autoComplete="off"
                        onChange={(e) =>
                            setData({
                                option: {
                                    name: data.option.name,
                                    values: data.option.values,
                                    value: e.target.value,
                                },
                            })
                        }
                    />
                </div>
            </form>
            <div className="my-5 inline-block cursor-pointer rounded-lg border-2 border-gray-300 bg-white p-2 text-xl text-emerald-500 shadow-lg">
                <FaPlus onClick={addValue} />
            </div>
            <div>
                <h2>Opzioni Aggiunte:</h2>
                <ul>
                    {data.option.values.map((value, index) => (
                        <li className="flex items-center" key={index}>
                            Tipo: {data.option.name}, Valore: {value}
                            <div className="ml-3 inline-block cursor-pointer rounded-lg border-2 border-gray-300 bg-white p-2 text-xl text-emerald-500 shadow-lg">
                                <BsFillTrash3Fill
                                    className="text-xl text-red-500"
                                    onClick={() => deleteValue(index)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-3 text-center">
                <input
                    type="submit"
                    disabled={processing}
                    className={`ml-4 mt-5 inline-flex items-center rounded-md border border-transparent bg-sky-400 px-6 py-3 text-[20px] text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-sky-500 focus:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-sky-900 ${
                        processing && 'bg-gray-500 opacity-25'
                    }`}
                    form="optionForm"
                    value={'Crea Opzioni'}
                />
            </div>
        </div>
    );
}
