import React from 'react';
import {createRoot} from 'react-dom/client'
import App from './App.js'
import MyFooter from './Components/footer/index.js';
import MyNav from './Components/header/index.js';
import 'antd/dist/antd.css'
import {Layout} from 'antd';

const {Header, Footer, Sider, Content} = Layout;

const container = document.getElementById('root');
const root = createRoot(container)
root.render(
    <Layout>
        <Header><MyNav /></Header>
        <Content><App /></Content>
        <Footer style={{ textAlign: 'center' }}><MyFooter /></Footer>
    </Layout>
)