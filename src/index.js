import React, { createElement } from 'react';
// import ReactDOM, {createRoot} from 'react-dom'
import {createRoot} from 'react-dom/client'
import App from './App.js'

// ReactDOM.render(<App />, document.getElementById('root'));
const container = document.getElementById('root');
const root = createRoot(container)
root.render(<App />)