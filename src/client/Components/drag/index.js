import React, {useState} from "react";
import DragList from './drag-list'
import DragCanvas from './drag-canvas'
import DragAttribute from './drag-attribute'
import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DRAG_COMPONENT_TYPE, DRAG_ITEM_TYPE } from './const'
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

export default function DragApp() {
    const drag_items = [...MOCK_ITEMS];
    
    // TODO: adaptively position
    const [dragMain, setDragMain] = useState({
        id: '0',
        type: DRAG_ITEM_TYPE.BLANK,
        height: 600,
        width: 360,
        left: 520,
        top: 40,
        children: [...drag_items],
    }); 

    const [dragItem, setDragItem] = useState(null);
    const [dragItems, setDragItems] = useState([...drag_items]);
    const [attributeId, setAttributeId] = useState(null);
  
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="drag-app">
                <DragList/>
                <DragCanvas key={hashCode(JSON.stringify(dragMain))} dragMain={dragMain} setDragMain={setDragMain} setAttributeId={setAttributeId}/>
                <DragAttribute dragMain={dragMain} dragItemId={attributeId} setDragMain={setDragMain}/>
            </div>
        </DndProvider>
    );
}
