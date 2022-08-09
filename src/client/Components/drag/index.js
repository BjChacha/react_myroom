import React, {useState, createRef} from "react";
import { useOutletContext } from 'react-router-dom';
import DragList from './drag-list'
import DragCanvas from './drag-canvas'
import DragAttribute from './drag-attribute'
import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";
import './index.css'

function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash |= 0;
    }
    return hash;
}

export default function DragApp() {
    
    const [localCanvas, setLocalCanvas] = useOutletContext();

    const [dragMain, setDragMain] = useState(localCanvas);
    const [attributeId, setAttributeId] = useState(null);
    const [hashKey, setHashKey] = useState(dragMain ? hashCode(JSON.stringify(dragMain)) : 10022);

    const setDragMainWithKey = (obj) => {
        setDragMain(obj);
        setHashKey(hashCode(JSON.stringify(obj)));
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="drag-app">
                <DragList/>
                <DragCanvas key={hashKey} dragMain={dragMain} setDragMain={setDragMainWithKey} setAttributeId={setAttributeId}/>
                <DragAttribute dragMain={dragMain} dragItemId={attributeId} localCanvas={localCanvas} setDragMain={setDragMainWithKey} setLocalCanvas={setLocalCanvas}/>
            </div>
        </DndProvider>
    );
}
