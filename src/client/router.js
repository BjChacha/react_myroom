import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import App from './app';
import DragApp from './Components/drag'
import AuthApp from './Components/auth'
import HomeApp from './Components/home'
import { Error404App } from './Components/error'

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='/' element={<HomeApp />} />
                    <Route path='/drag' element={<DragApp />} />
                    <Route path='/auth' element={<AuthApp />} />
                    <Route path='*' element={<Error404App />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
