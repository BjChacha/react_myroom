import React from 'react';
import { useDrag } from 'react-dnd';
import { DRAG_COMPONENT_TYPE } from '../../const'

export default function DragTextComponent() {

    const [_, drag] = useDrag(() => ({
        type: DRAG_COMPONENT_TYPE.TEXT,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));

    return (
        <div className='drag-text-component border-solid border-2 border-black rounded-md h-12 w-20 font-sans text-center text-xl leading-11 cursor-grab' ref={drag}>
            Text
        </div>);
}