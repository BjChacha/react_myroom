import React from 'react';
import {createRoot} from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './app';
import DragApp from './Components/drag'
import Login from './Routes/login'
import 'antd/dist/antd.css';
import "./index.css";

const root = createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<App/>}>
            <Route path='canvas' element={<DragApp/>}></Route>
            <Route path='login' element={<Login/>}></Route>
        </Route>
    </Routes>
  </BrowserRouter>
);
