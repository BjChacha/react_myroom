import React, { useRef } from 'react';
import { useDrag } from 'react-dnd'
import { DRAG_ITEM_TYPE } from 'const'

export default function DragVideoItem(props) {

    const {attributes, onClickCallback} = props;
    const videoRef = useRef(null);
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: DRAG_ITEM_TYPE.VIDEO,
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

    const handlePlay = () => {
        if (videoRef.current.readyState > 0) {
            videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
        }
    }
    
    const defaultUrl = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm";

    return (
        <div
            key={attributes.id}
            onClick={(e)=>{
                onClickCallback(attributes.id)
                e.stopPropagation();
            }}
            style={{
                color: attributes.color??'#000000',
                fontSize: `${attributes.size??12}px`,
                width: `${attributes.width??100}px`,
                height: `${attributes.height??20}px`,
                left: `${attributes.left??0}px`,
                top: `${attributes.top??0}px`,
                lineHeight: `${attributes.height??20}px`,
                position: 'absolute',
                backgroundColor: attributes.backgroundColor??'#ffffff',
                textAlign: attributes.align??'left',
                // TODO: 0 when dragging
                opacity: collected.isDragging ? 0 : 1,
            }}
            ref={drag}
        >
            <video 
                preload='auto' 
                width={attributes.width??100} 
                ref={videoRef} 
                onClick={handlePlay}>
                <source src={attributes.value == 'item' ? defaultUrl : attributes.value} type="video/webm" />
                <div>Video</div>
            </video>
        </div>
        );
}
