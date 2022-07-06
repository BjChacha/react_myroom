import React from 'react'
import { DRAG_TYPE } from '../const';

export default function DragAttribute(props) {

    const {dragItems, dragItemId, setDragItems} = props;

    const getDragItem = (id) => {
        for (let item of dragItems) {
            if (id === item.id) return item;
        }
        return null;
    }

    const setDragItemAttribute = (id, key, value) => {
        for (let item of dragItems) {
            if (id === item.id) item[key] = value;
        }
    }

    const getItemAttribute = () => {``
        const dragItem = getDragItem(dragItemId);

        if (dragItem) {
            if (dragItem.type === DRAG_TYPE.TEXT) {
                return <div key={dragItem.id} className="attribute">
                    <div className='mx-2 my-2 text-xl'>
                        Text Component
                    </div>
                    <div className='attribute-area'>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor="text-value">Value</label>
                            <input
                                id='text-value'
                                name='text-value'
                                defaultValue={dragItem.value}
                                type="text"
                                size="10"></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-color'>Text Color</label>
                            <input
                                id='text-color'
                                name='text-color'
                                defaultValue={dragItem.color}
                                type="color"></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label>Background Color</label>
                            <input 
                                defaultValue={dragItem.backgroundColor}
                                type="color"></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-size'>Text Size</label>
                            <input 
                                id='text-size'
                                name='text-size'
                                defaultValue={dragItem.size}
                                type="number"
                                min="2"
                                max="20"
                                ></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-width'>Width</label>
                            <input 
                                id='text-width'
                                name='text-width'
                                defaultValue={dragItem.width}
                                type="number"
                                min="2"
                                max="40"
                                ></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-height'>Height</label>
                            <input 
                                id='text-height'
                                name='text-height'
                                defaultValue={dragItem.height}
                                type="number"
                                min="2"
                                max="40"
                                ></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label>Position X</label>
                            <input 
                                defaultValue={dragItem.left}
                                type="number"
                                min="2"
                                max="40"
                                ></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label>Position Y</label>
                            <input 
                                defaultValue={dragItem.top}
                                type="number"
                                min="2"
                                max="40"
                                ></input>
                        </div>
                    </div>
                    <button className='m-2'>Confirm</button>
                </div>
            } else {
                return <div>
                    Unsupported item
                </div>
            }
        } else {
            return <div>
                No selected item.
            </div>
        }
        
    }

    return (
        <div className='drag-attribute h-screen w-96 bg-green-500'> 
            <div className='drag-attribute-title text-center h-8 bg-slate-600 leading-8 text-lg'>
                Drag Attribute
            </div>
            <div className='drag-attribute-area flex'>{getItemAttribute()}
            </div>
        </div>
    )
}
