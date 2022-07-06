import React from 'react';
import { DRAG_TYPE } from '../const';

export default function DragCanvas(props) {

    const {dragItems, setDragItemId} = props;

    const itemToContent = (item) => {
        let content = null;
        switch(item.type) {
            case DRAG_TYPE.TEXT:
                content = 
                    <div
                        key={item.id}
                        onClick={()=>{
                            console.log(`Clicking on item ${item.id}`)
                            setDragItemId(item.id)
                        }}
                        style={{
                            color: item.color,
                            fontSize: item.size,
                            width: `${item.width}px`,
                            height: `${item.height}px`,
                            left: `${item.left}px`,
                            top: `${item.top}px`,
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
            <div className='drag-canvas-area relative'>{generateContent()}
            </div>
        </div>
    )
}
