import React, {useState, createRef} from "react";
import DragList from './drag-list'
import DragCanvas from './drag-canvas'
import DragAttribute from './drag-attribute'
import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DRAG_COMPONENT_TYPE, DRAG_ITEM_TYPE } from 'const'
import { MOCK_ITEMS } from '../../Mocks/data'
import './index.css'

function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash |= 0;
    }
    return hash;
}

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

const initialCanvas = localStorage.getItem('saved-canvas') ? JSON.parse(localStorage.getItem('saved-canvas')) : defaultCanvas;

export default function DragApp() {
    
    const [dragMain, setDragMain] = useState(initialCanvas);

    const [attributeId, setAttributeId] = useState(null);
    const [hashKey, setHashKey] = useState(hashCode(JSON.stringify(dragMain.id)));

    const setDragMainWithKey = (obj) => {
        setDragMain(obj);
        setHashKey(hashCode(JSON.stringify(obj)));
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="drag-app">
                <DragList/>
                <DragCanvas key={hashKey} dragMain={dragMain} setDragMain={setDragMainWithKey} setAttributeId={setAttributeId}/>
                <DragAttribute dragMain={dragMain} dragItemId={attributeId} setDragMain={setDragMainWithKey}/>
            </div>
        </DndProvider>
    );
}
