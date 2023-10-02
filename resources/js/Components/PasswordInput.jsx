import { usePasswordVisibility } from "../Hooks/usePasswordVisibility";
import EyeIcon from "./EyeIcon";

export default function PasswordInput(props) {
    const [passwordIsVisible, togglePasswordVisibility] =
        usePasswordVisibility();

    return (
        <div className="relative flex">
            <input
                onChange={props.handleChange ? props.handleChange : () => {}}
                className={`focus:border-indigo-500 focus:ring-indigo-500 w-full p-3 text-lg rounded-md shadow-lg ${props.className}`}
                type={passwordIsVisible ? "text" : "password"}
                autoComplete={props.autoComplete}
                placeholder={props.placeholder}
            />
            <EyeIcon
                passwordIsVisible={passwordIsVisible}
                togglePasswordVisibility={togglePasswordVisibility}
            />
        </div>
    );
}
