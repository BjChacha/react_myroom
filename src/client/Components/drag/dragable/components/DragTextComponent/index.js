import React from 'react';
import { useDrag } from 'react-dnd';
import { DRAG_COMPONENT_TYPE } from 'const'

export default function DragTextComponent() {

    const [_, drag] = useDrag(() => ({
        type: DRAG_COMPONENT_TYPE.TEXT,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));

    return (
        <div className='drag-component drag-component-text' ref={drag}>
            Text
        </div>);
}
