import React from 'react';
import { useDrag } from 'react-dnd';
import { DRAG_COMPONENT_TYPE } from 'client/const'

export default function DragImageComponent() {

    const [_, drag] = useDrag(() => ({
        type: DRAG_COMPONENT_TYPE.IMAGE,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));

    return (
        <div className='drag-component drag-component-image' ref={drag}>
            Image 
        </div>);
}
