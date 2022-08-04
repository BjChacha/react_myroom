import React, {useState} from 'react';
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import {message, Menu} from 'antd';

import "./index.css";

export default function MyNav(props) {

    const navigate = useNavigate();

    const items = [
        {label: 'Home', key: 'home'},
        {label: 'Drag', key: 'drag'},
        {label: 'User', key: 'user'}
    ];

    const toLink = {
        'home': '/',
        'drag': '/drag',
        'user': '/auth',
    };

    const handleNavigation = (item) => {
        //console.log({item, key, keyPath, e});
        navigate(toLink[item.key]);
    };

    return (
        <Menu items={items} mode='horizontal' theme='dark' onClick={handleNavigation} />
    )
}
