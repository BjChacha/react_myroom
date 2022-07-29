import React, {useState} from 'react';
import { Link, useOutletContext } from "react-router-dom";
import {message} from 'antd';

import "./index.css";

export default function MyNav(props) {

    const {token, setToken} = props;
    const {refresh, setRefresh} = useState(0)

    const logout = () => {
        // console.log('Logout!');
        message.success('Logout success!');
        setToken(null);
    }

    return (
        <div className="MyNav-container bg-slate-500">
            <nav className='MyNav'>
                <Link className='nav-item nav-index' to="/">Index</Link>
                <Link className='nav-item nav-canvas' to="/drag">Canvas</Link>
                {token ? <a className='nav-item nav-login' onClick={logout}>Logout</a> : <Link className='nav-item nav-login' to="/auth">Login</Link>}
            </nav>
        </div>
    )
}