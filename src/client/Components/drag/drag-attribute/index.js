import React, { useState } from 'react'
import { DRAG_ITEM_TYPE } from 'const'
import { Radio, Input, InputNumber, Slider, Col, Row, ConfigProvider, Button, Popconfirm, notification, Divider } from 'antd'
import html2canvas from 'html2canvas'
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

    const deleteDragItem = (id) => {
        dragMain.children = dragMain.children.filter(item => item.id !== id);
        setDragMain(dragMain);
    }

    const saveCanvas = (showConfirm) => {
        if (localStorage.getItem('saved-canvas') === null || showConfirm == null) {
            localStorage.setItem('saved-canvas', JSON.stringify(dragMain));
            notification.success({
                message: 'Saved',
                description: 'Saved canvas successfully',
            });
        } else {
            showConfirm();
        }
    }

    const loadCanvas = () => {
        const savedCanvas = localStorage.getItem('saved-canvas');
        console.log(savedCanvas);
        console.log(JSON.parse(savedCanvas));
        if (savedCanvas) {
            setDragMain(JSON.parse(savedCanvas));
        } else {
            notification.error({
                message: 'Load failed',
                description: 'No saved canvas',
            });
        }
    }

    const setItemAttribute = (id, key, value) => {
        if (id === '0') {
            // setting main entity attribute
            dragMain[key] = value;
        } else {
            // setting children attribute
            for (let item of dragMain.children) {
                if (id === item.id) {
                    if (item.type === DRAG_ITEM_TYPE.IMAGE || item.type === DRAG_ITEM_TYPE.VIDEO) {
                        const ratio = item.height / item.width;;
                        if (key === 'height') {
                            item.height = value;
                            item.width = Math.round(value / ratio);
                        } else if (key === 'width') {
                            item.width = value;
                            item.height = Math.round(value * ratio);
                        }
                    } else {
                        item[key] = value;
                    } 
                }
            }
        }
        setDragMain({...dragMain});
    }

    const setAlign = (id, data) => {
        if (data.checked) setDragItemAttribute(id, 'align', data.value);
    }
    
    const getIdComponent = (id) => {
        return (
            <div className="drag-attribute-item drag-attribute-id">
                <Row align='middle' justify='space-between'>
                    <Col span={2}>
                        <div>Id</div>
                    </Col>
                    <Col span={2}>
                        <div>{dragItemId}</div>
                    </Col>
                </Row>
            </div>
        );
    }

    const getValueComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-value'>
                <Row align='middle' justify='space-between'>
                    <Col span={10}>
                        <label htmlFor='attribute-value'>Value</label>
                    </Col>
                    <Col span={12}>
                        <Input.TextArea
                            id='attribute-value'
                            name='attribute-value'
                            value={value}
                            onChange={(e) => setItemAttribute(id, 'value', e.target.value)}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
    
    const getTextColorComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-textcolor'>
                <Row align='middle' justify='space-between'>
                    <Col span={10}>
                        <label htmlFor='attribute-textcolor'>Text Color</label>
                    </Col>
                    <Col span={6}> 
                        <Input
                            id='attribute-textcolor'
                            name='attribute-textcolor'
                            type='color'
                            value={value}
                            bordered={false}
                            onChange={(e) => setItemAttribute(id, 'color', e.target.value)}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

    const getBackgroundColorComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-backgroundcolor'>
                <Row align='middle' justify='space-between'>
                    <Col span={12}>
                        <label htmlFor='attribute-backgroundcolor'>Background Color</label>
                    </Col>
                    <Col span={6}> 
                        <Input
                            id='attribute-backgroundcolor'
                            name='attribute-backgroundcolor'
                            type='color'
                            value={value}
                            bordered={false}
                            onChange={(e) => setItemAttribute(id, 'backgroundColor', e.target.value)}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

    const getTextSizeComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-textsize'>
                <Row align='middle' justify='space-between'>
                    <Col span={12}>
                        <label htmlFor='attribute-textsize'>Text Size</label>
                    </Col>
                    <Col span={12} push={2}>
                        <InputNumber
                            id='attribute-textsize'
                            name='attribute-textsize'
                            type='number'
                            value={value}
                            min={1}
                            max={100}
                            onChange={value => setItemAttribute(id, 'size', value)}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

    const getWidthComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-width'>
                <Row align='middle' justify='space-between'>
                    <Col span={10}>
                        <label htmlFor='attribute-width'>Width</label>
                    </Col>
                    <Col span={12} push={2}>
                        <Row>
                            <InputNumber
                                id='attribute-width'
                                name='attribute-width'
                                type='number'
                                value={value}
                                min={1}
                                max={id==='0'?window.innerWidth:dragMain.width}
                                onChange={value => setItemAttribute(id, 'width', value)}
                            />
                        </Row>
                        <Row>
                            <Col span={18}>
                                <Slider value={value} min={1} max={id==='0'?window.innerWidth:dragMain.width} onChange={value => setItemAttribute(id, 'width', value)} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }

    const getHeightComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-height'>
                <Row align='middle' justify='space-between'>
                    <Col span={10}>
                        <label htmlFor='attribute-height'>Height</label>
                    </Col>
                    <Col span={12} push={2}>
                        <Row>
                            <InputNumber
                                id='attribute-height'
                                name='attribute-height'
                                type='number'
                                value={value}
                                min={1}
                                max={id ==='0'?window.innerHeight:dragMain.height}
                                onChange={value => setItemAttribute(id, 'height', value, lockRatio)}
                            />
                        </Row>
                        <Row>
                            <Col span={18}>
                                <Slider value={value} min={1} max={id==='0'?window.innerHeight:dragMain.height} onChange={value => setItemAttribute(id, 'height', value)} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }

    const getLeftComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-left'>
                <Row align='middle' justify='space-between'>
                    <Col span={10}>
                        <label htmlFor='attribute-left'>Position X</label>
                    </Col>
                    <Col span={12} push={2}>
                        <InputNumber
                            id='attribute-left'
                            name='attribute-left'
                            type='number'
                            value={value}
                            onChange={value => setItemAttribute(id, 'left', value)}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

    const getTopComponent = (id, value) => {
        return (
            <div className='drag-attribute-item drag-attribute-top'>
                <Row align='middle' justify='space-between'>
                    <Col span={10}>
                        <label htmlFor='attribute-top'>Position Y</label>
                    </Col>
                    <Col span={12} push={2}>
                        <InputNumber
                            id='attribute-top'
                            name='attribute-top'
                            type='number'
                            value={value}
                            onChange={value => setItemAttribute(id, 'top', value)}
                        />
                    </Col>
                </Row>
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
                <Row align='middle' justify='space-between'>
                    <Col span={6}>
                        <div>Align</div>
                    </Col>
                    <Col span={16}>
                        <div>
                            <Radio.Group 
                                options={options}
                                value={value}
                                onChange={(e) => setItemAttribute(id, 'align', e.target.value)}o
                                optionType='button'
                                size='small'
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    const getDeleteComponent = (id) => {
        const [visible, setVisible] = useState(false);

        const handlePopconfirm = () => { setVisible(true); }
        const handleCancel = () => { setVisible(false); }
        const handleConfirm = () => {
            setVisible(false);
            deleteDragItem(id);
        }

        return (
            <Row justify='space-around'>
                <Popconfirm
                    title='Are you sure delete this item?'
                    okText='Yes'
                    cancelText='No'
                    okType='danger'
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    visible={visible}
                >
                    <Button onClick={handlePopconfirm}>Delete</Button>
                </Popconfirm>
            </Row>
        )
    };

    const getCanvasUtilsComponent = () => {

        const handleConfirm = () => {
            saveCanvas();
        }

        const clearCanvas = () => {
            dragMain.children = [];
            setDragMain(dragMain);
        }
        

        const exportCanvas = () => {
            const target = document.querySelector('.drag-blank-item').cloneNode(true);
            target.style.position = 'fixed';
            target.style.top = '0';
            target.style.left = '0';
            document.body.appendChild(target);

            html2canvas(target, {backgroundColor: '#ffffff', allowTaint: true}).then(canvas => {
                //document.body.appendChild(canvas);
                const dataUrl = canvas.toDataURL('image/png', 1.0);
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `canvas_${new Date().toLocaleDateString().replaceAll('/', '-')}.png`;
                link.click();
            }).finally(() => {
                document.body.removeChild(target);
            });
        }

        return (
            <Row justify='space-around'>
                <Popconfirm
                    title='Saved canvas detected. Are you sure to save?'
                    okText='Yes'
                    cancelText='No'
                    okType='danger'
                    onConfirm={handleConfirm}
                >
                    <Button size='small'>Save</Button>
                </Popconfirm>
                <Button size='small' onClick={() => loadCanvas()}>Load</Button>
                <Popconfirm
                    title='Are you sure to clear canvas?'
                    okText='Yes'
                    cancelText='No'
                    okType='danger'
                    onConfirm={() => clearCanvas()}
                >
                <Button size='small'>Clear</Button>
                </Popconfirm>
                <Button size='small' onClick={() => exportCanvas()}>Export</Button>
            </Row>
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
                    {getIdComponent(id)}
                    {getValueComponent(id, value)}
                    {getTextColorComponent(id, color)}
                    {getBackgroundColorComponent(id, backgroundColor)}
                    {getTextSizeComponent(id, size)}
                    {getWidthComponent(id, width)}
                    {getHeightComponent(id, height)}
                    {getLeftComponent(id, left)}
                    {getTopComponent(id, top)}
                    {getTextAlignComponent(id, align)}
                    {getDeleteComponent(id)}
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
                    {getIdComponent(id)}
                    {getValueComponent(id, value)}
                    {getWidthComponent(id, width)}
                    {getLeftComponent(id, left)}
                    {getTopComponent(id, top)}
                    {getDeleteComponent(id)}
                </div>
            </div>
        );
    }

    const getImageAttributes = (attributes) => {
        
        let {id, type, value, width, height, left, top} = attributes;

        return (
            <div key={id} className="drag-attributes">
                <div className='drag-attribute-name'>
                    Image Component
                </div>
                <div className='drag-attribute-area'>
                    {getIdComponent(id)}
                    {getValueComponent(id, value)}
                    {getWidthComponent(id, width)}
                    {getLeftComponent(id, left)}
                    {getTopComponent(id, top)}
                    {getDeleteComponent(id)}
                </div>
            </div>
        );
    }

    const getBlankAttributes = (attributes) => {
        let {id, width, height, left, top} = attributes;
        
        return (
            <div key={dragItemId} className="drag-attributes">
                <div className='drag-attribute-name'>
                    Canvas Component
                </div>
                <div className='drag-attribute-area'>
                    {getIdComponent(id)}
                    {getWidthComponent(id, width)}
                    {getHeightComponent(id, height)}
                    {getLeftComponent(id, left)}
                    {getTopComponent(id, top)}
                    <Divider />
                    {getCanvasUtilsComponent()}
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
            } else if (type == DRAG_ITEM_TYPE.IMAGE) {
                return getImageAttributes(dragItem);
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
