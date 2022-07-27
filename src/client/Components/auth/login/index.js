import React, {useState} from 'react'
import Proptypes from 'prop-types'

import './index.css'
import { data } from 'autoprefixer';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then(data => data.json());
}

export default function Login(props) {

    const {setToken} = props;

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const {token} = await loginUser({
            username,
            password,
            type: e.nativeEvent.submitter.name,
        });
        setToken(token);
    };

    return (
        <div className='login-form-container'>
            <form onSubmit={handleSubmit}>
                <div className='login-form-item login-form-username'>
                    <label htmlFor="username">Username</label>
                    <input size='12' type="text" id='username' maxLength={12} onChange={e => setUserName(e.target.value)}/>
                </div>
                <div className='login-form-item login-form-password'>
                    <label htmlFor="password">Password</label>
                    <input size='12' type="password" id='password' maxLength={16} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className='login-form-item login-form-button'>
                    <button name='login'>Login</button>
                    <button name='register'>Register</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: Proptypes.func.isRequired,
};