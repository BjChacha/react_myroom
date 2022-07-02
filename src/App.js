import React, {useState} from "react";
import AppLeft from './Components/app-left'
import AppCanvas from './Components/app-canvas'
import AppRight from './Components/app-right'
import "./App.css"


function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App flex flex-row justify-around">
            <AppLeft/>
            <AppCanvas />
            <AppRight />
        </div>
    );
    
}

export default App;