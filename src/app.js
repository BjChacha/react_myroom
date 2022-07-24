import React from 'react';
import DragApp from './Components/drag';
import MyFooter from './Components/footer';
import MyNav from './Components/nav';
import { Outlet } from "react-router-dom";
import {Layout} from 'antd';

const {Header, Footer, Sider, Content} = Layout;

export default function App() {
    return (
        <Layout>
            <Header><MyNav /></Header>
            <Content><Outlet /></Content>
            <Footer><MyFooter /></Footer>
        </Layout>
    )
}
