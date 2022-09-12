import React, { useState } from 'react';
import MyFooter from './Components/footer';
import MyNav from './Components/nav';
import { Outlet } from "react-router-dom";
import {Layout} from 'antd';
import useLocalCanvas from './Hooks/useLocalCanvas'

const {Header, Footer, Content} = Layout;

export default function App() {

    const [localCanvas, setLocalCanvas] = useLocalCanvas();

    return (
        <Layout>
            <Header><MyNav /></Header>
            <Content><Outlet context={[localCanvas, setLocalCanvas]}/></Content>
            <Footer><MyFooter /></Footer>
        </Layout>
    )
}
