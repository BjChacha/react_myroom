import React, { useState } from 'react'
import { DRAG_COMPONENT_TYPE } from '../const';

export default function DragAttribute(props) {

    const {dragItems, dragItemId, setDragItems, testValue} = props;
    
    const getDragItem = (id) => {
        for (let item of dragItems) {
            if (id === item.id) return item;
        }
        return null;
    }

    const setDragItemAttribute = (id, key, value) => {
        for (let item of dragItems) {
            if (id === item.id) {
                item[key] = value;
            }
        }
    }

    const setAlign = (id, data) => {
        if (data.checked) setDragItemAttribute(id, 'align', data.value);
    }

    const getItemAttribute = () => {
        const dragItem = getDragItem(dragItemId);
        // console.log("attribute: ", dragItemId);
        // console.log("test: ", testValue);
        const inputDomData = [];

        if (dragItem) {
            if (dragItem.type === DRAG_COMPONENT_TYPE.TEXT) {
                return <div key={dragItem.id} className="attribute">
                    <div className='mx-2 my-2 text-xl'>
                        Text Component
                    </div>
                    <div className='attribute-area'>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <p>Value</p>
                            <p>{dragItem.id}</p>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor="text-value">Value</label>
                            <input
                                id='text-value'
                                name='text-value'
                                value={dragItem.value}
                                type="text"
                                size="10"
                                ref={(element) => {inputDomData[0] = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItem.id, 'value', inputDomData[0].value);
                                    setDragItems([...dragItems]);
                                }}></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-color'>Text Color</label>
                            <input
                                id='text-color'
                                name='text-color'
                                value={dragItem.color}
                                type="color"
                                ref={(element) => {inputDomData[1] = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItem.id, 'color', inputDomData[1].value);
                                    setDragItems([...dragItems]);
                                }}></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='background-color'>Background Color</label>
                            <input
                                id='background-color'
                                name='background-color' 
                                value={dragItem.backgroundColor}
                                type="color"
                                ref={(element) => {inputDomData[2] = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItem.id, 'backgroundColor', inputDomData[2].value);
                                    setDragItems([...dragItems]);
                                }}></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-size'>Text Size</label>
                            <input 
                                id='text-size'
                                name='text-size'
                                value={dragItem.size}
                                type="number"
                                min="2"
                                max="670"
                                ref={(element) => {inputDomData[3] = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItem.id, 'size', +inputDomData[3].value);
                                    setDragItems([...dragItems]);
                                }}></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-width'>Width</label>
                            <input 
                                id='text-width'
                                name='text-width'
                                value={dragItem.width}
                                type="number"
                                min="2"
                                max="200"
                                ref={(element) => {inputDomData[4] = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItem.id, 'width', +inputDomData[4].value);
                                    setDragItems([...dragItems]);
                                }}></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-height'>Height</label>
                            <input 
                                id='text-height'
                                name='text-height'
                                value={dragItem.height}
                                type="number"
                                min="2"
                                max="790"
                                ref={(element) => {inputDomData[5] = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItem.id, 'height', +inputDomData[5].value);
                                    setDragItems([...dragItems]);
                                }}></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-left'>Position X</label>
                            <input 
                                id='text-left'
                                name='text-left'
                                value={dragItem.left}
                                type="number"
                                min="0"
                                // todo: 自适应边界：根据实际canvas大小和组件大小，计算最大值
                                max="670"
                                ref={(element) => {inputDomData[6] = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItem.id, 'left', +inputDomData[6].value);
                                    setDragItems([...dragItems]);
                                }}></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-top'>Position Y</label>
                            <input 
                                id='text-left'
                                name='text-left'
                                value={dragItem.top}
                                type="number"
                                min="0"
                                // todo: 自适应边界：根据实际canvas大小和组件大小，计算最大值
                                max="790"
                                ref={(element) => {inputDomData[7] = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItem.id, 'top', +inputDomData[7].value);
                                    setDragItems([...dragItems]);
                                }}></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                                Align
                                <div>
                                    <input 
                                        type="radio" 
                                        id="text-align-left"
                                        name="contact" 
                                        value="left" 
                                        defaultChecked={dragItem.align === 'left'}
                                        ref={(element) => {inputDomData[8] = element;}}
                                        onChange={() => {
                                            setAlign(dragItem.id, inputDomData[8]);
                                            setDragItems([...dragItems]);
                                        }}
                                        ></input>
                                    <label htmlFor="text-align-left">Left</label>
                                    <input 
                                        type="radio" 
                                        id="text-align-center"
                                        name="contact" 
                                        value="center" defaultChecked={dragItem.align === 'center'}
                                        ref={(element) => {inputDomData[9] = element;}}
                                        onChange={() => {
                                            setAlign(dragItem.id, inputDomData[9]);
                                            setDragItems([...dragItems]);
                                        }}></input>
                                    <label htmlFor="text-align-center">Center</label>
                                    <input 
                                        type="radio" 
                                        id="text-align-right"
                                        name="contact" 
                                        value="right" 
                                        defaultChecked={dragItem.align === 'right'}
                                        ref={(element) => { inputDomData[10] = element;}}
                                        onChange={() => {
                                            setAlign(dragItem.id, inputDomData[10]);
                                            setDragItems([...dragItems]);
                                        }}></input>
                                    <label htmlFor="text-align-right">Right</label>
                                </div>
                        </div>
                    </div>
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
