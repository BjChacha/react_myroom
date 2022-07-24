import React from 'react';
import { Link } from "react-router-dom";

import "./index.css";

export default function MyNav() {

    return (
        <div className="MyNav-container bg-slate-500">
            <nav className='MyNav'>
                <Link className='nav-item nav-index' to="/">Index</Link>
                <Link className='nav-item nav-canvas' to="/canvas">Canvas</Link>
                <Link className='nav-item nav-login' to="/login">Login</Link>
            </nav>
        </div>
    )
}