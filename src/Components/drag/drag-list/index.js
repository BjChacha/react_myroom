import React from 'react'
import DragTextComponent from '../dragable/DragTextComponent'
import { Typography } from 'antd';
const { Title } = Typography;

export default function DragList() {
    return (
        <div className='drag-list h-screen w-96 bg-red-500'> 
            <div className='drag-list-title text-center h-8 bg-slate-300 leading-8 text-lg'>
                Drag List
            </div>
            <div className='drag-list-area flex flex-col items-center p-6'>
                <DragTextComponent></DragTextComponent>
            </div>
        </div>
    )
}
