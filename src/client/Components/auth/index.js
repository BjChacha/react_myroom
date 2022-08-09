import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import useToken from '../../Hooks/useToken'
import useLocalUsername from '../../Hooks/useLocalUsername'
import useLocalEmail from '../../Hooks/useLocalEmail'
import Login from './login'
import Dashboard from './dashboard'
import './index.css'

export default function AuthApp() {

    const [localCanvas, setLocalCanvas] = useOutletContext();

    const [token, setToken] = useToken();
    const [localUsername, setLocalUsername] = useLocalUsername();
    const [localEmail, setLocalEmail] = useLocalEmail();

    return token ? 
        <Dashboard 
            token={token} 
            localUsername={localUsername} 
            localEmail={localEmail} 
            setToken={setToken} 
            setLocalUsername={setLocalUsername} 
            setLocalEmail={setLocalEmail} 
            setLocalCanvas={setLocalCanvas}
        /> :
        <Login 
            setToken={setToken} 
            setLocalUsername={setLocalUsername} 
            setLocalEmail={setLocalEmail}
            setLocalCanvas={setLocalCanvas}
        />
}
