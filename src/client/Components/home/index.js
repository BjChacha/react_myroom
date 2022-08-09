import React from 'react';
import { Row, Col, Card, Divider, Tabs } from 'antd';

export default function HomeApp() {

    return (
        <div className='home-app'>
            <Divider />
            <Row justify='center'>
                <Card 
                    title='MyRoom App' 
                    hoverable={true}
                    style={{ width: '15%' }}
                >
                    <Row justify='space-between'><Col>Framework </Col><Col>React</Col></Row>
                    <Row justify='space-between'><Col>Drag&Drop </Col><Col>React-dnd</Col></Row>
                    <Row justify='space-between'><Col>UI </Col><Col>Ant Design</Col></Row>
                    <Row justify='space-between'><Col>Database </Col><Col>sqlite3</Col></Row>
                    <Row justify='space-between'><Col>Server </Col><Col>Express</Col></Row>
                </Card>
            </Row>
        </div>
    );
}
