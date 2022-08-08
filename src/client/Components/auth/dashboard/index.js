import React, { useState } from 'react';
import { Row, Col, Button, Popconfirm, message, Input, Tooltip, Divider} from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { updatePasswordRequest, updateEmailRequest, getEmailRequest } from '../utils'
import './index.css';

export default function Dashboard(props) {

    const { token, localUsername, localEmail, setToken, setLocalUsername, setLocalEmail } = props;

    const passwordPlaceholder = '********';

    const [password, setPassword] = useState();
    const [email, setEmail] = useState(localEmail);

    const [passwordEditable, setPasswordEditable] = useState(false);
    const [emailEditable, setEmailEditable] = useState();

    const checkPassword = (password) => {
        // consist of alphabet, digit and symbol
        const passwordRegex = /^[a-zA-Z0-9!@#\$%\^&\*]+$/;
        return (
            password &&
            password.length >= 8 &&
            password.length <= 16 &&
            passwordRegex.test(password));
    }

    const changePassword = () => {
        if (!checkPassword(password)) {
            message.error('Password is invalid!');
            setPassword(null);
        } else {
            updatePasswordRequest(localUsername, token, password).then(res => {
                if (res.error) {
                    message.error(`Password changed failed: ${res.error}`);
                    setPassword(null);
                } else {
                    message.success('Password changed successfully!');
                }
            });
        }
    }

    const changeEmail = () => {
        if (!/^\w+@\w+\.\w+$/.test(email)) { 
            message.error('Invalid email address!');
            setEmail(localEmail);
        } else {
            updateEmailRequest(localUsername, token, email).then(res => {
                if (res.error) {
                    message.error(`Email changed failed: ${res.error}`);
                    setEmail(localEmail);
                } else {
                    message.success('Email changed successfully!');
                    setLocalEmail(email);
                }
            });
        }
    }
    
    const handlePasswordButton = (e) => {
        if (passwordEditable) {
            if (!password) setPassword();
            else {
                changePassword();
            }
            setPasswordEditable(false);
        } else {
            setPasswordEditable(true);
        }
    }

    const handleEmailButton = (e) => {
        if (emailEditable) {
            if (!email) setEmail(localEmail);
            else if (email !== localEmail) {
                changeEmail();
            }
            setEmailEditable(false);
        } else {
            setEmailEditable(true);
        }
    }

    const handleLogoutConfirm = (e) => {
        setToken(null);
        console.log('logout...');
    }

    const handleLogoutCancel = (e) => {
        console.log('cancel logout...');
    }

    return (
        <div className="dashboard">
            <Row className='dashboard-title' justify='center'>Dashboard</Row>
            <Divider />
            <Row justify='space-between'>
                <Col span={8}>Username</Col>
                <Col span={14}>
                    <Input
                        value={localUsername}
                        bordered={false}
                    />
                </Col>
            </Row>
            <Row className='dashboard-row' justify='space-between'>
                <Col span={8}>Password</Col>
                <Col span={14}>
                    <Input.Group compact>
                        <Input.Password
                            style={{width: 'calc(100% - 40px)'}}
                            value={password}
                            placeholder={passwordPlaceholder}
                            disabled={!passwordEditable}
                            bordered={passwordEditable}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                        <Tooltip placement='right' title={password && passwordEditable ? "Confirm" : "Edit"}><Button icon={password && passwordEditable ? <CheckOutlined/> : <EditOutlined/>} onClick={handlePasswordButton}/></Tooltip>
                    </Input.Group>
                </Col>
            </Row> 
            <Row className='dashboard-row' justify='space-between'>
                <Col span={8}>Email</Col>
                <Col span={14}>
                    <Input.Group compact>
                        <Input
                            type='email'
                            style={{width: 'calc(100% - 40px)'}}
                            value={email}
                            disabled={!emailEditable}
                            bordered={emailEditable}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Tooltip placement='right' title={email && emailEditable && email !== localEmail ? "Confirm" : "Edit"}><Button icon={email && emailEditable && email !== localEmail? <CheckOutlined/> : <EditOutlined/>} onClick={handleEmailButton}/></Tooltip>
                    </Input.Group>
                </Col>
            </Row>
            <Row className='dashboard-row dashboard-button' justify='center'>
                <Popconfirm
                    title="Are you sure you want to logout?"
                    onConfirm={handleLogoutConfirm}
                    onCancel={handleLogoutCancel}
                    okText="Yes"
                    cancelText="No"
                    okType="danger"
                >
                    <Button size='large' shape='round'>Logout</Button>
                </Popconfirm>
            </Row>
        </div>
    );
}
