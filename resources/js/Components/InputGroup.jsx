import InputError from './InputError';
import InputLabel from './InputLabel';
import TextInput from './TextInput';

export default function InputGroup({
    className = '',
    name,
    label,
    value,
    error,
    onChange,
}) {
    return (
        <div className={className}>
            <InputLabel
                className={`text-xl ${error ? 'text-red-500' : ''}`}
                htmlFor={name}
                value={label}
            />

            <TextInput
                id={name}
                name={name}
                value={value}
                className={`mt-1 block w-full ${
                    error ? 'border-red-500' : ''
                } focus:bg-emerald-200`}
                autoComplete="off"
                onChange={onChange}
            />

            <InputError className="mt-2 text-xl" message={error} />
        </div>
    );
}
