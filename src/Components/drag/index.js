import React, {useState} from "react";
import DragComponent from './drag-component'
import DragCanvas from './drag-canvas'
import DragAttribute from './drag-attribute'
export default function DragApp() {
    const [count, setCount] = useState(0);

    return (
        <div className="App flex flex-row justify-between bg-cyan-300">
            <DragComponent/>
            <DragCanvas />
            <DragAttribute />
        </div>
    );
}
