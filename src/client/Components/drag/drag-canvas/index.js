import React from 'react';
import { DRAG_COMPONENT_TYPE as DRAG_COMPONENT_TYPE, DRAG_ITEM_TYPE } from '../const';
import { useDrop, useDrag } from 'react-dnd'
import DragTextItem from '../dragable/DragTextItem'
import DragBlankItem from '../dragable/DragBlankItem'
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

    const itemToContent = (item) => {
        let content = null;
        switch(item.type) {
            case DRAG_COMPONENT_TYPE.TEXT:
                content = <DragTextItem key={item.id} attributes={item} onclickCallback={setAttributeId}></DragTextItem>
                break;
            case DRAG_COMPONENT_TYPE.IMAGE:
                break;
            case DRAG_COMPONENT_TYPE.VIDEO:
                break;
            case DRAG_COMPONENT_TYPE.AUDIO:
                break;
            case DRAG_COMPONENT_TYPE.CARD:
                break;
        }
        return content;
    }

    const generateContent = () => {
        const output = [];
        for (const item of dragItems) {
            output.push(itemToContent(item));
        }
        return output;
    }

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
