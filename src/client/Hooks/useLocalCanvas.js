import { useState } from "react";
import { MOCK_ITEMS } from '../Mocks/data'
import { DRAG_COMPONENT_TYPE, DRAG_ITEM_TYPE } from 'client/const'

const STORAGE_TYPE = "session";
const STORAGE_KEY = "savedCanvas";

const dragItems = [...MOCK_ITEMS];

const defaultCanvas = {
        id: '0',
        type: DRAG_ITEM_TYPE.BLANK,
        height: 600,
        width: 360,
        left: 520,
        top: 40,
        children: [...dragItems],
}

export default function useLocalCanvas() {
    const storage = STORAGE_TYPE === 'session' ? sessionStorage : localStorage;
    const getLocalCanvas= () => {
        return storage.getItem(STORAGE_KEY) ? JSON.parse(storage.getItem(STORAGE_KEY)) : defaultCanvas;
    };

    const [localCanvas, setLocalCanvas] = useState(getLocalCanvas());

    const saveLocalCanvas= (localCanvas) => {
        localCanvas ? storage.setItem(STORAGE_KEY, JSON.stringify(localCanvas)) : storage.removeItem(STORAGE_KEY);
        setLocalCanvas(localCanvas ?? defaultCanvas);
    };

    return [
        localCanvas,
        saveLocalCanvas,
    ];
}
