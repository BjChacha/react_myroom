import React from 'react'
import DragTextComponent from '../dragable/DragTextComponent'
import { Typography } from 'antd';
import './index.css'

const { Title } = Typography;

export default function DragList() {
    return (
        <div className='drag-list'> 
            <div className='drag-list-title'>
                Drag List
            </div>
            <div className='drag-list-area'>
                <DragTextComponent></DragTextComponent>
            </div>
        </div>
    )
}
