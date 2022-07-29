import React, {useState} from 'react';
import Proptypes from 'prop-types';
import {message} from 'antd';
import {Form, Input, Button} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

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
    
    const [pwVisible, setPwVisible] = useState(false);

    const handleSubmit = async (e, type) => {
        e.preventDefault();
        // const type = e.nativeEvent.submitter.name;

        console.log('submit: ',username, password);
        const resJson = await submitUser({
            username,
            password,
            type,
        });

        if ('error' in resJson) {
            // console.log(`${type} failed: ${resJson.error}`);
            message.error(resJson.error);
            setError(resJson.error)
        } else if ('token' in resJson) {
            // console.log('Login success! Token get!');
            message.success('Login success!');
            setToken(resJson.token);
        }
    };

    const handleUsername = e => {
        e.target.value = e.target.value.replace(/\W/g, '');
        setUsername(e.target.value);
    };
    
    const handlePassword = e => {
        e.target.value = e.target.value.replace(/[^ a-zA-Z0-9!@#\$%\^&\*]/g, '');
        setPassword(e.target.value);
    };

    return (
        <div className='login-form-container'>
            <Form onSubmit={handleSubmit}>
                <Form.Item 
                    className='login-form-item'
                    // label="Username"
                    name="username"
                    rules={[{
                        required: true,
                        message: 'Username (6-12)'
                    }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} type='text' placeholder="Username"/>
                    {/* <label htmlFor="username">Username</label>
                    <input 
                        size='12' 
                        type="text" 
                        id='username' 
                        value={username}
                        minLength={6} 
                        maxLength={12} 
                        placeholder={'Username (6-12)'} 
                        pattern={USERNAME_REGEX} 
                        onChange={handleUsername} 
                        required/> */}
                </Form.Item>
                <Form.Item 
                    className='login-form-item'
                    // label='Password'
                    name='password'
                    rules={[{
                        required: true,
                        message: 'Password (8-16)'
                    }]}
                >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type='password' placeholder="Password"/>
                    {/* <label htmlFor="password">Password</label>
                    <input 
                        size='12' 
                        type={pwVisible ? "text" : "password"} 
                        id='password' 
                        value={password}
                        minLength={8} 
                        maxLength={16} 
                        placeholder={'Password (8-16)'} 
                        pattern={PASSWORD_REGEX} 
                        onChange={handlePassword} 
                        onMouseOver={() => setPwVisible(true)} 
                        onMouseOut={() => setPwVisible(false)} 
                        required/> */}
                </Form.Item>
                <Form.Item 
                    className='login-form-submit'
                >
                    <Button className='login-form-button' name='login' onClick={e => handleSubmit(e, 'login')}>Login</Button>
                    <Button className='login-form-button' name='register' onClick={e => handleSubmit(e, 'register')}>Register</Button>
                    {/* <button name='login'>Login</button>
                    <button name='register'>Register</button> */}
                </Form.Item>
            </Form>
        </div>
    )
}

Login.propTypes = {
    setToken: Proptypes.func.isRequired,
};