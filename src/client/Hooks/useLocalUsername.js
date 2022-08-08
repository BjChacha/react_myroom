import { useState } from "react";

const STORAGE_TYPE = "session";
const STORAGE_KEY = "localUsername";

export default function useLocalUsername() {
    const storage = STORAGE_TYPE === 'session' ? sessionStorage : localStorage;
    const getLocalUsername = () => {
        return storage.getItem(STORAGE_KEY);
    };

    const [localUsername, setLocalUsername] = useState(getLocalUsername());

    const saveLocalUsername = (localUsername) => {
        localUsername ? storage.setItem(STORAGE_KEY, localUsername) : storage.removeItem(STORAGE_KEY);
        setLocalUsername(localUsername);
    };

    return [
        localUsername,
        saveLocalUsername,
    ];
}
