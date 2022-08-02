import React from 'react';
import { useDrag, useDrop } from 'react-dnd'
import { DRAG_COMPONENT_TYPE, DRAG_ITEM_TYPE, COMPONENT2ITEM } from '../../const'
import DragTextItem from '../DragTextItem'

export default function DragBlankItem(props) {

    function displayChildren() {
        const res = attributes.children.map((item) => 
            <DragTextItem key={item.id} attributes={item} onClickCallback={onClickCallback}/>
        );
        return res;
    }

    function moveChildren(id, dx, dy) {
        for (let item of attributes.children) {
            if (item.id === id) {
                item.left += dx;
                item.top += dy;
            }
        }
        setAttributes({...attributes});
    }

    const ref = React.useRef(null);
    const {attributes, setAttributes, onClickCallback} = props;

    const [collected, drag, dragPreview] = useDrag(() => ({
        type: DRAG_ITEM_TYPE.BLANK,
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
    
    const [collected2, drop] = useDrop({
        accept: [
            ...Object.values(DRAG_ITEM_TYPE).slice(0, -1), 
            ...Object.values(DRAG_COMPONENT_TYPE),
        ],
        drop: (item, monitor) => {
            const t = monitor.getItemType();
            if (Object.values(DRAG_ITEM_TYPE).includes(t)) {
                const {x, y} = monitor.getDifferenceFromInitialOffset();
                moveChildren(item.id, x, y);
                onClickCallback(item.id);
            } else if (Object.values(DRAG_COMPONENT_TYPE).includes(t)) {
                const id = `${attributes.children.length + 1}`;
                const {x, y} = monitor.getClientOffset();
                console.log(x - +attributes.left, y - +attributes.top);
                const curX = x - +attributes.left - 243;
                const curY = y - +attributes.top - 113;
                attributes.children.push({
                    id,
                    type: COMPONENT2ITEM[t],
                    value: 'item',
                    color: '#000000',
                    backgroundColor: '#e5e5e5',
                    size: 16,
                    width: 100,
                    height: 20,
                    left: curX,
                    top: curY,
                    align: 'center',
                });
                setAttributes({...attributes});
            }
        },
        collect: (monitor) => {

        },
    });

    drag(drop(ref));

    return (
        <div 
            className='drag-blank-item'
            key={attributes.id}
            onClick={()=>{
               onClickCallback(attributes.id)
            }}
            style={{
                width: `${attributes.width}px`,
                height: `${attributes.height}px`,
                left: `${attributes.left}px`,
                top: `${attributes.top}px`,
                position: 'absolute',
                border: '1px solid #ccc',
                backgroundColor: '#fff',
                overflow: 'hidden',
                // TODO: 0 when dragging
                opacity: collected.isDragging ? 0 : 1,
                boxShadow: '0 0 4px rgba(0,0,0,0.5)',
            }}
            ref={ref}
        >
            {displayChildren()}
        </div>
        );
}
