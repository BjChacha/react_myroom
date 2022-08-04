import React, { useState } from 'react'
import { DRAG_ITEM_TYPE } from 'const'
import { Radio } from 'antd'
import './index.css'

export default function DragAttribute(props) {

    const {dragMain, dragItemId, setDragMain} = props;
    
    const getDragItem = (id) => {
        if (id === '0') return dragMain; 
        for (let item of dragMain.children) {
            if (id === item.id) return item;
        }
        return null;
    }

    const setItemAttribute = (id, key, value) => {
        if (id === '0') {
            // setting main entity attribute
            dragMain[key] = value;
        } else {
            // setting children attribute
            for (let item of dragMain.children) {
                if (id === item.id) {
                    item[key] = value;
                }
            }
        }
        setDragMain({...dragMain});
    }

    const setAlign = (id, data) => {
        if (data.checked) setDragItemAttribute(id, 'align', data.value);
    }
    
    const getValueComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-value'>
                <label htmlFor='attribute-value'>Value</label>
                <textarea
                    id='attribute-value'
                    name='attribute-value'
                    value={value}
                    rows={2}
                    cols={16}
                    onChange={(e) => setItemAttribute(id, 'value', e.target.value)}
                ></textarea>
            </div>
        );
    }
    
    const getTextColorComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-textcolor'>
                <label htmlFor='attribute-textcolor'>Text Color</label>
                <input
                    id='attribute-textcolor'
                    name='attribute-textcolor'
                    type='color'
                    value={value}
                    onChange={(e) => setItemAttribute(id, 'color', e.target.value)}
                ></input>
            </div>
        );
    }

    const getBackgroundColorComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-backgroundcolor'>
                <label htmlFor='attribute-backgroundcolor'>Background Color</label>
                <input
                    id='attribute-backgroundcolor'
                    name='attribute-backgroundcolor'
                    type='color'
                    value={value}
                    onChange={(e) => setItemAttribute(id, 'backgroundColor', e.target.value)}
                ></input>
            </div>
        );
    }

    const getTextSizeComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-textsize'>
                <label htmlFor='attribute-textsize'>Text Size</label>
                <input
                    id='attribute-textsize'
                    name='attribute-textsize'
                    type='number'
                    value={value}
                    min={1}
                    max={100}
                    onChange={(e) => setItemAttribute(id, 'size', e.target.value)}
                ></input>
            </div>
        );
}

    const getWidthComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-width'>
                <label htmlFor='attribute-width'>Width</label>
                <input
                    id='attribute-width'
                    name='attribute-width'
                    type='number'
                    value={value}
                    min={1}
                    max={1200}
                    onChange={(e) => setItemAttribute(id, 'width', +e.target.value)}
                ></input>
            </div>
        );
    }

    const getHeightComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-height'>
                <label htmlFor='attribute-height'>Height</label>
                <input
                    id='attribute-height'
                    name='attribute-height'
                    type='number'
                    value={value}
                    min={1}
                    max={1200}
                    onChange={(e) => setItemAttribute(id, 'height', +e.target.value)}
                ></input>
            </div>
        );
    }

    const getLeftComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-left'>
                <label htmlFor='attribute-left'>Position X</label>
                <input
                    id='attribute-left'
                    name='attribute-left'
                    type='number'
                    value={value}
                    min={-400}
                    max={400}
                    onChange={(e) => setItemAttribute(id, 'left', +e.target.value)}
                ></input>
            </div>
        );
    }

    const getTopComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-top'>
                <label htmlFor='attribute-top'>Position Y</label>
                <input
                    id='attribute-top'
                    name='attribute-top'
                    type='number'
                    value={value}
                    min={-400}
                    max={400}
                    onChange={(e) => setItemAttribute(id, 'top', +e.target.value)}
                ></input>
            </div>
        );
    }

    const getTextAlignComponent = (id, value) => {
        const options = [{
                label: 'Left',
                value: 'left',
            }, {
                label: 'Center',
                value: 'center',
            }, {
                label: 'Right',
                value: 'right',
            }
        ];

        return (
            <div className='drag-attribute-item drag-attribute-textalign'>
                <div>Align</div>
                <div>
                    <Radio.Group 
                        options={options}
                        value={value}
                        onChange={(e) => setItemAttribute(id, 'align', e.target.value)}o
                        optionType='button'
                        size='small'
                    />
                </div>
            </div>
        );
    }


    const getTextAttributes = (attributes) => {

        let {id, type, value, color, backgroundColor, size, width, height, left, top, align} = attributes;
        
        return (
            <div key={id} className="drag-attributes">
                <div className='drag-attribute-name'>
                    Text Component
                </div>
                <div className='drag-attribute-area'>
                    <div className='drag-attribute-item drag-attribute-id'>
                        <div>Id</div>
                        <div>{dragItemId}</div>
                    </div>
                    {getValueComponent(id, value)}
                    {getTextColorComponent(id, color)}
                    {getBackgroundColorComponent(id, backgroundColor)}
                    {getTextSizeComponent(id, size)}
                    {getWidthComponent(id, width)}
                    {getHeightComponent(id, height)}
                    {getLeftComponent(id, left)}
                    {getTopComponent(id, top)}
                    {getTextAlignComponent(id, align)}
                </div>
            </div>
        );
    }

    const getVideoAttributes = (attributes) => {
        
        let {id, type, value, width, height, left, top} = attributes;

        return (
            <div key={id} className="drag-attributes">
                <div className='drag-attribute-name'>
                    Video Component
                </div>
                <div className='drag-attribute-area'>
                    <div className='drag-attribute-item drag-attribute-id'>
                        <div>Id</div>
                        <div>{dragItemId}</div>
                    </div>
                    {getValueComponent(id, value)}
                    {getWidthComponent(id, width)}
                    {getHeightComponent(id, height)}
                    {getLeftComponent(id, left)}
                    {getTopComponent(id, top)}
                </div>
            </div>
        );
    }

    const getBlankAttributes = (attributes) => {
        let {id, width, height} = attributes;
        
        return (
            <div key={dragItemId} className="drag-attributes">
                <div className='drag-attribute-name'>
                    Canvas Component
                </div>
                <div className='drag-attribute-area'>
                    <div className='drag-attribute-item drag-attribute-id'>
                        <div>Id</div>
                        <div>{dragItemId}</div>
                    </div>
                    {getWidthComponent(id, width)}
                    {getHeightComponent(id, height)}
                </div>
            </div>
        );
    }


    const displayItemAttribute = () => {
        const dragItem = getDragItem(dragItemId);
        const inputDomData = {};
        
        if (dragItem) {
            const type = dragItem.type;
            if (type === DRAG_ITEM_TYPE.BLANK) {
                return getBlankAttributes(dragItem)
            } else if (type === DRAG_ITEM_TYPE.TEXT) {
                return getTextAttributes(dragItem);
            } else if (type == DRAG_ITEM_TYPE.VIDEO) {
                return getVideoAttributes(dragItem);
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
        <div className='drag-attribute'> 
            <div className='drag-attribute-title'>
                Drag Attribute
            </div>
            {displayItemAttribute()}
        </div>
    )
}
