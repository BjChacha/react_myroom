import React, {useState} from "react";
import DragList from './drag-list'
import DragCanvas from './drag-canvas'
import DragAttribute from './drag-attribute'
import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DRAG_COMPONENT_TYPE } from './const'

const MOCK_ITEMS = [
    {
        id: '1',
        type: DRAG_COMPONENT_TYPE.TEXT,
        value: "This is a text 1",
        color: '#000000',
        backgroundColor: '#ffffff',
        size: 14,
        width: 120,
        height: 30,
        left: 100,
        top: 100,
        align: 'center',
    },
    {
        id: '2',
        type: DRAG_COMPONENT_TYPE.TEXT,
        value: "This is a text 2",
        color: '#ffff00',
        backgroundColor: '#ff00ff',
        size: 16,
        width: 200,
        height: 30,
        left: 100,
        top: 150,
        align: 'right',
    },
    {
        id: '3',
        type: DRAG_COMPONENT_TYPE.TEXT,
        value: "This is a text 3",
        color: '#0000ff',
        backgroundColor: '#ffff00',
        size: 12,
        width: 100,
        height: 20,
        left: 100,
        top: 200,
        align: 'center',
    },
]

export default function DragApp() {

    const [dragItem, setDragItem] = useState(null)
    const [dragItems, setDragItems] = useState([...MOCK_ITEMS])
    const [attributeId, setAttributeId] = useState(null)

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App flex flex-row justify-between bg-cyan-300">
                <DragList/>
                <DragCanvas key={dragItems.length} dragItems={dragItems} setDragItems={setDragItems} setAttributeId={setAttributeId}/>
                <DragAttribute dragItems={dragItems} dragItemId={attributeId} setDragItems={setDragItems}/>
            </div>
        </DndProvider>
    );
}
