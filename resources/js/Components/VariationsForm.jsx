import { useForm } from '@inertiajs/react';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import PrimaryButton from './PrimaryButton';

export default function VariationsForm({ variations }) {
    const { data, setData, put, errors, processing } = useForm({});

    const handleChange = (e, index) => {
        const newData = { ...data };
        newData[index] = { ...newData[index], [e.target.name]: e.target.value };
        newData[index] = { ...newData[index], id: variations[index].id };
        setData(newData);
    };

    const submit = (event) => {
        event.preventDefault();
        put(route('admin.variations.update', variations));
    };

    return (
        <div>
            {variations && (
                <form onSubmit={submit}>
                    {variations.map((el, index) => (
                        <div className="space-y-3" key={el.id}>
                            <p className="text-center text-xl font-bold text-emerald-500">
                                {el.variant}
                            </p>
                            <div className="flex items-center justify-around gap-5">
                                <div className="w-full">
                                    <InputLabel
                                        className="text-xl"
                                        htmlFor={`sku-${index}`}
                                        value="Codice Articolo"
                                    />
                                    <TextInput
                                        id={`sku-${index}`}
                                        name="sku"
                                        value={data[index]?.sku || ''}
                                        className="mt-1 block w-full focus:bg-emerald-200"
                                        autoComplete="off"
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel
                                        className="text-xl"
                                        htmlFor={`price-${index}`}
                                        value="Prezzo"
                                    />
                                    <TextInput
                                        id={`price-${index}`}
                                        name="price"
                                        value={data[index]?.price || ''}
                                        className="mt-1 block w-full focus:bg-emerald-200"
                                        autoComplete="off"
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-around gap-5 pb-5">
                                <div className="w-full">
                                    <InputLabel
                                        className="text-xl"
                                        htmlFor={`quantity-${index}`}
                                        value="Quantità"
                                    />
                                    <TextInput
                                        id={`quantity-${index}`}
                                        name="quantity"
                                        value={data[index]?.quantity || ''}
                                        className="mt-1 block w-full focus:bg-emerald-200"
                                        autoComplete="off"
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel
                                        className="text-xl"
                                        htmlFor={`cost-${index}`}
                                        value="Costo"
                                    />
                                    <TextInput
                                        id={`cost-${index}`}
                                        name="cost"
                                        value={data[index]?.cost || ''}
                                        className="mt-1 block w-full focus:bg-emerald-200"
                                        autoComplete="off"
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 text-center">
                        <PrimaryButton
                            className="ml-4 mt-5 bg-sky-400 px-6 py-3 text-[20px] hover:bg-sky-500"
                            disabled={processing}
                        >
                            Crea Varianti
                        </PrimaryButton>
                    </div>
                </form>
            )}
        </div>
    );
}
