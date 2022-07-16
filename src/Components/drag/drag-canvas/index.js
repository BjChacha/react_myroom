import React from 'react';
import { DRAG_COMPONENT_TYPE as DRAG_COMPONENT_TYPE, DRAG_ITEM_TYPE } from '../const';
import { useDrop, useDrag } from 'react-dnd'
import DragTextItem from '../dragable/DragTextItem'

export default function DragCanvas(props) {

    const {dragItems, setDragItems, setAttributeId, setTestValue} = props;

    const moveItem = (id, dx, dy) => {
        for (let item of dragItems) {
            if (item.id === id) {
                item.left += dx;
                item.top += dy;
            }
        }
    };

    const [, drop] = useDrop(() => ({
        accept: [DRAG_COMPONENT_TYPE.TEXT, DRAG_ITEM_TYPE.TEXT],
        drop: (item, monitor) => {
            setAttributeId(null);
            const t = monitor.getItemType();
            let itemId = null;
            
            if (t === DRAG_COMPONENT_TYPE.TEXT) {
                itemId = `${dragItems.length + 1}`;

                const { x, y } = monitor.getClientOffset();
                const currentX = x - 313;
                const currentY = y - 123;

                setDragItems([
                  ...dragItems,
                  {
                    id: itemId,
                    type: DRAG_COMPONENT_TYPE.TEXT,
                    value: "This is a text",
                    color: '#000000',
                    backgroundColor: '#ffffff',
                    size: 12,
                    width: 100,
                    height: 20,
                    left: currentX,
                    top: currentY,
                    align: 'center',
                  }
                ])
            } else if (t === DRAG_ITEM_TYPE.TEXT) {
                itemId = item.id;

                const {x, y} = monitor.getDifferenceFromInitialOffset();
                // console.log(x, y);
                moveItem(itemId, x, y);
            }
            setAttributeId(itemId);
            setTestValue(Math.random());
        }
    }));

    const itemToContent = (item) => {
        let content = null;
        switch(item.type) {
            case DRAG_COMPONENT_TYPE.TEXT:
                content = <DragTextItem attributes={item} onclickCallback={setAttributeId}></DragTextItem>
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
        <div className='drag-canvas h-screen w-full bg-sky-400'> 
            <div className='drag-canvas-title text-center h-8 bg-slate-400 leading-8 text-lg'>
                Drag Canvas
            </div>
            <div className='drag-canvas-area relative h-full w-full' ref={drop}>{generateContent()}
            </div>
        </div>
    )
}
