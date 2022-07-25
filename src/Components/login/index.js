import React from 'react'
import './index.css'

export default function LoginApp() {
    return (
        <div className='login-form-container'>
            <form action='/authorization' method='post'>
                <div className='login-form-item login-form-username'>
                    <label for="username">Username</label>
                    <input size='12' type="text" id='username'/>
                </div>
                <div className='login-form-item login-form-password'>
                    <label for="password">Password</label>
                    <input size='12' type="password" id='password'/>
                </div>
                <div className='login-form-item login-form-button'>
                    <button value='login'>Login</button>
                    <button value='register'>Register</button>
                </div>
            </form>
        </div>
    )
}