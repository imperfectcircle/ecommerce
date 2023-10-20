import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, value = '', ...props },
    ref,
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            value={value}
            type={type}
            className={`rounded-lg p-3 shadow-lg focus:border-indigo-500 focus:bg-emerald-200 focus:ring-indigo-500 ${className}`}
            ref={input}
        />
    );
});
