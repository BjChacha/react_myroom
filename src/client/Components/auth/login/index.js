import React, {useState} from 'react';
import Proptypes from 'prop-types';
import {notification} from 'antd';
import {Form, Input, Button} from 'antd';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import './index.css';

const USERNAME_REGEX = '^[a-zA-Z0-9\-]+$';
const PASSWORD_REGEX = '^[a-zA-Z0-9!@#\$%\^&\*]{8,16}$';

async function submitUser(credentials) {
    return fetch('http://localhost:8080/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then(data => data.json());
}

export default function Login(props) {

    const {error, setError, setToken} = props;

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [validUsername, setValidUsername] = useState(false);
    const [validPassword, setValidPassword] = useState(false);

    const handleSubmit = async (e, type) => {
        e.preventDefault();

        console.log('submit: ',username, password);
        const resJson = await submitUser({
            username,
            password,
            type,
        });

        if ('error' in resJson) {
            notification.error({
                message: `Operation ${type} error!`,
                description: resJson.error,
            },);
            setError(resJson.error);
        } else if ('token' in resJson) {
            notification.success({
                message: `Operation ${type} success!`,
                description: 'Login success!',
            },);
            setToken(resJson.token);
        }
    };

    const handleUsername = e => {
        const _username = e.target.value;
        if (checkUsername(_username)) {
            setUsername(_username);
            setValidUsername(true);
        } else {
            setValidUsername(false);
        }
    };
    
    const handlePassword = e => {
        const _password = e.target.value;
        if (checkPassword(_password)) {
            setPassword(_password);
            setValidPassword(true);
        } else {
            setValidPassword(false);
        }
    };

    const checkUsername = (username) => {
        // only consist of alphabet and -
        const userNameRegex = /^[a-zA-Z0-9\-]+$/;
        return (
            username && 
            username.length >= 3 &&
            username.length <= 12 &&
            userNameRegex.test(username));
    }

    const checkPassword = (password) => {
        // consist of alphabet, digit and symbol
        const passwordRegex = /^[a-zA-Z0-9!@#\$%\^&\*]+$/;
        return (
            password &&
            password.length >= 8 &&
            password.length <= 16 &&
            passwordRegex.test(password));
    }
    return (
        <div className='login-form-container'>
            <Form onSubmit={e => handleSubmit(e, 'login')}>
                <Form.Item 
                    className='login-form-item'
                    // label="Username"
                    name="username"
                    getValueFromEvent = {e => e.target.value.replace(/\W/g, '')}
                    rules={[
                        {
                            required: true,
                            message: 'Username is required'
                        },
                        {
                            min: 6,
                            max: 12,
                            message: 'Length must be in \[6, 12\]'
                        },
                        {
                            pattern: USERNAME_REGEX,
                            message: 'Only consist of alpha and digit'
                        },
                    ]}>
                    <Input 
                        value={username}
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="Username"
                        onChange={handleUsername} 
                        allowClear
                    />
                </Form.Item>
                <Form.Item 
                    className='login-form-item'
                    // label='Password'
                    name='password'
                    getValueFromEvent = {e => e.target.value.replace(/[^ a-zA-Z0-9!@#\$%\^&\*]/g, '')}
                    rules={[
                        {
                            required: true,
                            message: 'Password is required'
                        },
                        {
                            min: 8,
                            max: 16,
                            message: 'Length must be in \[8, 16\]'
                        },
                        {
                            pattern: PASSWORD_REGEX,
                            message: 'Illegal character is not allowed'
                        },
                    ]}>
                    <Input.Password 
                        value={password}
                        prefix={<LockOutlined className="site-form-item-icon" />} 
                        placeholder="Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={handlePassword} 
                    />
                </Form.Item>
                <Form.Item 
                    className='login-form-submit'
                >
                    <Button className='login-form-button' htmlType='submit' name='login' disabled={validUsername&&validPassword==false} onClick={e => handleSubmit(e, 'login')}>Login</Button>
                    <Button className='login-form-button' name='register' disabled={validUsername&&validPassword==false} onClick={e => handleSubmit(e, 'register')}>Register</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

Login.propTypes = {
    setToken: Proptypes.func.isRequired,
};
