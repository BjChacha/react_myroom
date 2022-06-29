import React, {useState} from "react";
import { ConfigProvider, DatePicker, message, Button } from 'antd';
import "./App.css"


function App() {
    // render() 
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <h1>Hello World!</h1>
            <h1>Hello World!</h1>
            <Button onClick={() => setCount(count - 1)}>Primary</Button>
            <Button type='primary' onClick={() => {setCount(count + 1)}}>Click me {count} times</Button>
        </div>
    );
    
}

export default App;