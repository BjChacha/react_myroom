import React from 'react';
import { useDrop, useDrag } from 'react-dnd'
import DragTextItem from '../dragable/items/DragTextItem'
import DragBlankItem from '../dragable/items/DragBlankItem'
import { DRAG_COMPONENT_TYPE as DRAG_COMPONENT_TYPE, DRAG_ITEM_TYPE } from 'client/const';
import './index.css'

export default function DragCanvas(props) {

    const {dragMain, setDragMain, setAttributeId} = props;

    const moveItem = (dx, dy) => {
        dragMain.left += dx;
        dragMain.top += dy;
        setDragMain(dragMain);
    };

    const [, drop] = useDrop(() => ({
        accept: [DRAG_ITEM_TYPE.BLANK],
        drop: (item, monitor) => {
            const t = monitor.getItemType();
            if (t === DRAG_ITEM_TYPE.BLANK) {
                const {x, y} = monitor.getDifferenceFromInitialOffset();
                moveItem(x, y);
            }
            setAttributeId(item.id);
        }
    }));

    return (
        <div className='drag-canvas-app'> 
            <div className='drag-canvas-title'>
                Drag Canvas
            </div>
            <div className='drag-canvas-area' ref={drop}>
               <DragBlankItem attributes={dragMain} setAttributes={setDragMain} onClickCallback={setAttributeId}/>
            </div>
        </div>
    )
}
