import { useState } from "react";

const STORAGE_TYPE = "session";
const STORAGE_KEY = 'token'

export default function useToken() {
    const storage = STORAGE_TYPE === 'session' ? sessionStorage : localStorage;
    const getToken = () => {
        return storage.getItem(STORAGE_KEY);
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (token) => {
        token ? storage.setItem(STORAGE_KEY, token) : storage.removeItem(STORAGE_KEY);
        setToken(token);
    };

    return [
        token,
        saveToken,
    ];
}
