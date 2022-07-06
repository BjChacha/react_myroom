import React from 'react';
import { DRAG_TYPE } from '../const';
import { useDrop } from 'react-dnd'

export default function DragCanvas(props) {

    const {dragItems, setDragItems, setDragItemId} = props;
    const [_, drop] = useDrop(() => ({
        accept: DRAG_TYPE.TEXT,
        drop: (_, monitor) => {
            const { x, y } = monitor.getClientOffset();
            const currentX = x - 313;
            const currentY = y - 123;
            console.log(x, y)
            setDragItems([
              ...dragItems,
              {
                id: `${dragItems.length + 1}`,
                type: DRAG_TYPE.TEXT,
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
            ])}
    }));

    const itemToContent = (item) => {
        let content = null;
        switch(item.type) {
            case DRAG_TYPE.TEXT:
                content = 
                    <div
                        key={item.id}
                        onClick={()=>{
                            // console.log(`Clicking on item ${item.id}`)
                            setDragItemId(item.id)
                        }}
                        style={{
                            color: item.color,
                            fontSize: item.size,
                            width: `${item.width}px`,
                            height: `${item.height}px`,
                            left: `${item.left}px`,
                            top: `${item.top}px`,
                            lineHeight: `${item.height}px`,
                            position: 'absolute',
                            backgroundColor: item.backgroundColor,
                            textAlign: item.align,
                        }}>
                        {item.value}
                    </div>;
                break;
            case DRAG_TYPE.IMAGE:
                break;
            case DRAG_TYPE.VIDEO:
                break;
            case DRAG_TYPE.AUDIO:
                break;
            case DRAG_TYPE.CARD:
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
