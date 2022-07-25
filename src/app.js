import React, { useState } from 'react';
import MyFooter from './Components/footer';
import MyNav from './Components/nav';
import { Outlet } from "react-router-dom";
import {Layout} from 'antd';
import useToken from './Hooks/useToken'

const {Header, Footer, Content} = Layout;


export default function App(props) {

    const [token, setToken] = useToken(localStorage);

    console.log(token);

    return (
        <Layout>
            <Header><MyNav token={token} setToken={setToken}/></Header>
            <Content><Outlet context={[token, setToken]} /></Content>
            <Footer><MyFooter /></Footer>
        </Layout>
    )
}
