import React  from "react";
import {Menu} from 'antd';

export default function MyNav() {
    const items = [
        {label: 'Home', key: 'Home'},
        {label: 'App', key: 'App'}
    ];
    return (
        <div className="MyNav bg-slate-500">
            <Menu theme="dark" mode="horizontal" items={items} />
        </div>
    )
}