import { useState } from "react";

export default function useToken(storage=sessionStorage) {
    const getToken = () => {
        return storage.getItem('token');
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (token) => {
        token ? storage.setItem('token', token) : storage.removeItem('token');
        setToken(token);
    };

    return [
        token,
        saveToken,
    ];
}