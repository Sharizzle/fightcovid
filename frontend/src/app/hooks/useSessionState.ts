import { Dispatch, useState } from 'react';

// TODO: Unused at the moment. Might be needed later.
export const useNumericSessionState = (defaultValue: number, storageId: string): [number, Dispatch<number>] => {
    const loadLocalStorage = localStorage.getItem(storageId);
    const [state, setState] = useState(loadLocalStorage ? parseInt(loadLocalStorage) : defaultValue);

    const setStateWithSessionSave = (x: number): void => {
        localStorage.setItem(storageId, x.toString());
        setState(x);
    };

    return [state, setStateWithSessionSave];
};
