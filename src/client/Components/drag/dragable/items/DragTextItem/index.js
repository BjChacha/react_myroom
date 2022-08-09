import React from 'react';
import { useDrag } from 'react-dnd'
import { DRAG_ITEM_TYPE } from 'client/const'

export default function DragTextItem(props) {

    const {attributes, onClickCallback} = props;

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
            onClick={(e)=>{
                onClickCallback(attributes.id)
                e.stopPropagation();
            }}
            style={{
                type: DRAG_ITEM_TYPE.TEXT,
                color: attributes.color??'#000000',
                fontSize: `${attributes.size??12}px`,
                width: `${attributes.width??100}px`,
                height: `${attributes.height??20}px`,
                left: `${attributes.left??0}px`,
                top: `${attributes.top??0}px`,
                lineHeight: `${attributes.height??20}px`,
                position: 'absolute',
                backgroundColor: attributes.backgroundColor??'#ffffff',
                textAlign: attributes.align??'left',
                // TODO: 0 when dragging
                opacity: collected.isDragging ? 0 : 1,
            }}
            ref={drag}>
            {attributes.value??''}
        </div>
        );
}
