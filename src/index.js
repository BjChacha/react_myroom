import React from 'react';
import {createRoot} from 'react-dom/client'

import DragApp from './Components/drag';
import MyFooter from './Components/footer';
import MyNav from './Components/header';
import 'antd/dist/antd.css'
import "./index.css"
import {Layout} from 'antd';

const {Header, Footer, Sider, Content} = Layout;

const container = document.getElementById('root');
const root = createRoot(container)
root.render(
    <Layout>
        <Header><MyNav /></Header>
        <Content><DragApp /></Content>
        <Footer><MyFooter /></Footer>
    </Layout>
)