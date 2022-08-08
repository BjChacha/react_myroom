import React, { useState } from 'react';
import MyFooter from './Components/footer';
import MyNav from './Components/nav';
import { Outlet } from "react-router-dom";
import {Layout} from 'antd';
import useToken from './Hooks/useToken'

const {Header, Footer, Content} = Layout;


export default function App(props) {

    return (
        <Layout>
            <Header><MyNav /></Header>
            <Content><Outlet /></Content>
            <Footer><MyFooter /></Footer>
        </Layout>
    )
}
