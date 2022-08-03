import React from 'react';
import { useDrag } from 'react-dnd';
import { DRAG_COMPONENT_TYPE } from 'const'

export default function DragVideoComponent() {

    const [_, drag] = useDrag(() => ({
        type: DRAG_COMPONENT_TYPE.VIDEO,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));

    return (
        <div className='drag-component drag-component-video' ref={drag}>
            Video
        </div>);
}
