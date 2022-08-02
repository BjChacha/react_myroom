import React from 'react';
import { useDrag } from 'react-dnd';

const cursors = [
    'nw-resize', 'n-resize', 'ne-resize', 'w-resize', 'e-resize', 'sw-resize', 's-resize', 'se-resize'
]

export default function DragResizingItem(props) {

    const { no, top, left, width } = props;

    const { connectDragSource, connectDragPreview, isDragging } = useDrag();

    return (
        <div ref={drag} style={{
            position: 'absolute',
            top: top + 'px',
            left: left + 'px',
            width: width + 'px',
            height: width + 'px',
            cursor: cursors[+no],
        }}></div>
    );
}
