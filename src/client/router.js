import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import App from './app';
import DragApp from './Components/drag'
import AuthApp from './Components/auth'

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App/>}>
                    <Route path='/drag' element={<DragApp/>}></Route>
                    <Route path='/auth' element={<AuthApp/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}