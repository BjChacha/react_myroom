import React from 'react';
import { useDrag, useDrop } from 'react-dnd'
import { DRAG_COMPONENT_TYPE, DRAG_ITEM_TYPE, COMPONENT2ITEM } from 'client/const'
import DragTextItem from '../DragTextItem'
import DragImageItem from '../DragImageItem'
import DragVideoItem from '../DragVideoItem'

export default function DragBlankItem(props) {

    function displayChildren() {
        const res = attributes.children.map((item) => {
            if (item.type === DRAG_ITEM_TYPE.TEXT) {
                return <DragTextItem key={item.id} attributes={item} onClickCallback={onClickCallback}/>
            } else if (item.type === DRAG_ITEM_TYPE.IMAGE) {
                return <DragImageItem key={item.id} attributes={item} onClickCallback={onClickCallback}/>
            } else if (item.type === DRAG_ITEM_TYPE.VIDEO) {
                return <DragVideoItem key={item.id} attributes={item} onClickCallback={onClickCallback}/>
            }
        });
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
                let id = 1;
                for (let item of attributes.children) {
                    if (item.id == id) {
                        id ++;
                    } else if (item.id > id) break;
                }
                const {x, y} = monitor.getClientOffset();
                const curX = x - +attributes.left - 243;
                const curY = y - +attributes.top - 113;
                attributes.children.splice(id - 1, 0, {
                    id: `${id}`,
                    type: COMPONENT2ITEM[t],
                    value: 'item',
                    color: '#000000',
                    backgroundColor: '#e5e5e5',
                    size: 16,
                    width: 120,
                    height: 80,
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
                id: `${attributes.id ?? '0'}`,
                type: `${attributes.type ?? DRAG_ITEM_TYPE.BLANK}`,
                width: `${attributes.width ?? 360}px`,
                height: `${attributes.height ?? 600}px`,
                left: `${attributes.left ?? 520}px`,
                top: `${attributes.top ?? 40}px`,
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
