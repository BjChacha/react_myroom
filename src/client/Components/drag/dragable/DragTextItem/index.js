import React from 'react';
import { useDrag } from 'react-dnd'
import { DRAG_ITEM_TYPE } from '../../const'

export default function DragTextItem(props) {

    const {attributes, onclickCallback} = props;

    const [collected, drag, dragPreview] = useDrag(() => ({
        type: DRAG_ITEM_TYPE.TEXT,
        item: {
            id: attributes.id,
            left: attributes.left, 
            top: attributes.top,
        },
        options: {
            dropEffect: "move",
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            key={attributes.id}
            onClick={()=>{
                onclickCallback(attributes.id)
            }}
            style={{
                color: attributes.color,
                fontSize: `${attributes.size}px`,
                width: `${attributes.width}px`,
                height: `${attributes.height}px`,
                left: `${attributes.left}px`,
                top: `${attributes.top}px`,
                lineHeight: `${attributes.height}px`,
                position: 'absolute',
                backgroundColor: attributes.backgroundColor,
                textAlign: attributes.align,
                // TODO: 0 when dragging
                opacity: collected.isDragging ? 0 : 1,
            }}
            ref={drag}>
            {attributes.value}
        </div>
        );
}
