import React from 'react'
import {useOutletContext} from 'react-router-dom';
import Login from './login'
import Dashboard from './dashboard'
import './index.css'

export default function AuthApp() {
    const [token, setToken] = useOutletContext();

    return token ? <Dashboard/> : <Login setToken={setToken}/>
}