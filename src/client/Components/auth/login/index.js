import React, {useState} from 'react'
import Proptypes from 'prop-types'

import './index.css'

const USERNAME_REGEX = '^[a-zA-Z0-9\-]+$';
const PASSWORD_REGEX = '^[a-zA-Z0-9!@#\$%\^&\*]+$';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then(data => data.json());
}

export default function Login(props) {

    const {setToken} = props;

    const [username, setUsername] = useState();
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

    const handleUsername = async e => {
        e.target.value = e.target.value.replace(/![a-zA-Z0-9\-]+/, '');
        console.log(e.target.value);
        setUsername(e.target.value);
    };
    
    const handlePassword = async e => {
        e.target.value = e.target.value.replace(/![a-zA-Z0-9!@#\$%\^&\*]+/, '');
        setPassword(e.target.value);
    };

    return (
        <div className='login-form-container'>
            <form onSubmit={handleSubmit}>
                <div className='login-form-item'>
                    <label htmlFor="username">Username</label>
                    <input size='12' type="text" id='username' value={username} minLength={3} maxLength={12} placeholder={'Username (3-12)'} pattern={USERNAME_REGEX} onChange={handleUsername}/>
                </div>
                <div className='login-form-item'>
                    <label htmlFor="password">Password</label>
                    <input size='12' type="password" id='password' value={password} minLength={8} maxLength={16} placeholder={'Password (8-16)'} pattern={PASSWORD_REGEX} onChange={handlePassword}/>
                </div>
                <div className='login-form-submit'>
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