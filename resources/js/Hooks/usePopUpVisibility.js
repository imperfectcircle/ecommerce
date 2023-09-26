import { useState } from 'react';

export const usePopUpVisibility = () => {
    const [popUpVisibility, setPopUpVisibility] = useState(false);

    const togglePopUpVisibility = () => {
        setPopUpVisibility(!popUpVisibility);
    };

    return [popUpVisibility, togglePopUpVisibility];
};
