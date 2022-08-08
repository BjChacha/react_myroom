import { useState } from "react";

const STORAGE_TYPE = "session";
const STORAGE_KEY = "localEmail";

export default function useEmail() {
    const storage = STORAGE_TYPE === 'session' ? sessionStorage : localStorage;
    const getLocalEmail= () => {
        return storage.getItem(STORAGE_KEY);
    };

    const [localEmail, setLocalEmail] = useState(getLocalEmail());

    const saveLocalEmail= (localEmail) => {
        localEmail? storage.setItem(STORAGE_KEY, localEmail) : storage.removeItem(STORAGE_KEY);
        setLocalEmail(localEmail);
    };

    return [
        localEmail,
        saveLocalEmail,
    ];
}
