import React from 'react'
import DragTextComponent from '../dragable/components/DragTextComponent'
import DragImageComponent from '../dragable/components/DragImageComponent'
import DragVideoComponent from '../dragable/components/DragVideoComponent'
import DragAudioComponent from '../dragable/components/DragAudioComponent'
import DragCardComponent from '../dragable/components/DragCardComponent'
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
                <DragImageComponent></DragImageComponent>
                <DragVideoComponent></DragVideoComponent>
                {/*
                <DragAudioComponent></DragAudioComponent>
                <DragCardComponent></DragCardComponent>
                */}
            </div>
        </div>
    )
}
