import React, { useState } from 'react'
import { DRAG_COMPONENT_TYPE } from '../const';

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
            if (id === item.id) {
                item[key] = value;
            }
        }
        setDragItems([...dragItems]);
    }

    const setAlign = (id, data) => {
        if (data.checked) setDragItemAttribute(id, 'align', data.value);
    }

    const getItemAttribute = () => {
        const dragItem = getDragItem(dragItemId);
        const inputDomData = {};
        
        if (dragItem) {
            let {type, value, color, backgroundColor, size, width, height, left, top, align} = dragItem;
            
            if (type === DRAG_COMPONENT_TYPE.TEXT) {
                return <div key={dragItemId} className="attribute">
                    <div className='mx-2 my-2 text-xl'>
                        Text Component
                    </div>
                    <div className='attribute-area'>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <p>Value</p>
                            <p>{dragItemId}</p>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor="text-value">Value</label>
                            <textarea
                                id='text-value'
                                name='text-value'
                                value={value}
                                type="text"
                                rows={2}
                                cols={12}
                                ref={(element) => {inputDomData.value = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItemId, 'value', inputDomData.value.value);
                                }}></textarea>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-color'>Text Color</label>
                            <input
                                id='text-color'
                                name='text-color'
                                value={color}
                                type="color"
                                ref={(element) => {inputDomData.color = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItemId, 'color', inputDomData.color.value);
                                }}></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='background-color'>Background Color</label>
                            <input
                                id='background-color'
                                name='background-color' 
                                value={backgroundColor}
                                type="color"
                                ref={(element) => {inputDomData.backgroundColor = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItemId, 'backgroundColor', inputDomData.backgroundColor.value);
                                }}></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-size'>Text Size</label>
                            <input 
                                id='text-size'
                                name='text-size'
                                value={size}
                                type="number"
                                min="2"
                                max="670"
                                ref={(element) => {inputDomData.size = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItemId, 'size', +inputDomData.size.value);
                                }}></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-width'>Width</label>
                            <input 
                                id='text-width'
                                name='text-width'
                                value={width}
                                type="number"
                                min="2"
                                max="200"
                                ref={(element) => {inputDomData.width = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItemId, 'width', +inputDomData.width.value);
                                }}></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-height'>Height</label>
                            <input 
                                id='text-height'
                                name='text-height'
                                value={height}
                                type="number"
                                min="2"
                                max="790"
                                ref={(element) => {inputDomData.height = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItemId, 'height', +inputDomData.height.value);
                                }}></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-left'>Position X</label>
                            <input 
                                id='text-left'
                                name='text-left'
                                value={left}
                                type="number"
                                min="0"
                                // todo: 自适应边界：根据实际canvas大小和组件大小，计算最大值
                                max="670"
                                ref={(element) => {inputDomData.left = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItemId, 'left', +inputDomData.left.value);
                                }}></input>
                        </div>
                        <div className='mx-2 my-2 w-56 flex justify-between'>
                            <label htmlFor='text-top'>Position Y</label>
                            <input 
                                id='text-left'
                                name='text-left'
                                value={top}
                                type="number"
                                min="0"
                                // todo: 自适应边界：根据实际canvas大小和组件大小，计算最大值
                                max="790"
                                ref={(element) => {inputDomData.top = element;}}
                                onChange={() => {
                                    setDragItemAttribute(dragItemId, 'top', +inputDomData.top.value);
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
                                    defaultChecked={align === 'left'}
                                    ref={(element) => {inputDomData.alignLeft = element;}}
                                    onChange={() => {
                                        setAlign(dragItemId, inputDomData.alignLeft);
                                    }}
                                    ></input>
                                <label htmlFor="text-align-left">Left</label>
                                <input 
                                    type="radio" 
                                    id="text-align-center"
                                    name="contact" 
                                    value="center" defaultChecked={align === 'center'}
                                    ref={(element) => {inputDomData.alignCenter = element;}}
                                    onChange={() => {
                                        setAlign(dragItemId, inputDomData.alignCenter);
                                    }}></input>
                                <label htmlFor="text-align-center">Center</label>
                                <input 
                                    type="radio" 
                                    id="text-align-right"
                                    name="contact" 
                                    value="right" 
                                    defaultChecked={align === 'right'}
                                    ref={(element) => {inputDomData.alignRight = element;}}
                                    onChange={() => {
                                        setAlign(dragItemId, inputDomData.alignRight);
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
