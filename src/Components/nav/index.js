import React from 'react';
import {Menu} from 'antd';
import { Link } from "react-router-dom";

export default function MyNav() {

    return (
        <div className="MyNav bg-slate-500">
            <nav>
                <Link to="/canvas">Canvas</Link>
                <Link to="/login">Login</Link>

            </nav>
        </div>
    )
}