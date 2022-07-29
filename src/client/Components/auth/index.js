import React, { useState } from 'react'
import {useOutletContext} from 'react-router-dom';
import Login from './login'
import Dashboard from './dashboard'
import './index.css'

export default function AuthApp() {

    const [token, setToken] = useOutletContext();
    const [error, setError] = useState(null);

    return token ? <Dashboard/> : <Login error={error} setError={setError} setToken={setToken}/>
}