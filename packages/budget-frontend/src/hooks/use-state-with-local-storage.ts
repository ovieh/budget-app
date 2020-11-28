import { useEffect, useState } from 'react';
import { User } from '../generated/graphql';

export const useStateWithLocalStorage = (localStorageKey: string) => {
    const [value, setValue] = useState<User | null>(() => {
        try {
            const item = localStorage.getItem(localStorageKey);

            return item ? JSON.parse(item) : null;
        } catch (error) {
            return null;
        }
    });

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value, localStorageKey]);

    return [value, setValue] as const;
};
