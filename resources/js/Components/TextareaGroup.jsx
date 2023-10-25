import InputError from './InputError';
import InputLabel from './InputLabel';

export default function TextareaGroup({
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

            <textarea
                rows="3"
                className={`mt-1 block w-full resize-none rounded-md text-xl shadow-lg ${
                    error ? 'border-red-500' : ''
                } focus:bg-emerald-200`}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
            >
                {value}
            </textarea>

            <InputError className="mt-2 text-xl" message={error} />
        </div>
    );
}
