const e = require('express');
const {removeUser, addUser, getUser, getUserInfo, updateUser} = require('./db');
const {hashSync, signToken, verifyToken, getSaltSync} = require('./jwt')
const sqlite3 = require('sqlite3').verbose();

const AUTH_TABLE_NAME = 'accounts'
const TOKEN_EXPIRATION = '1h';

const checkUsername = (username) => {
    // only consist of alphabet and -
    userNameRegex = /^[a-zA-Z0-9\-]+$/;
    return (
        username && 
        username.length >= 3 &&
        username.length <= 12 &&
        userNameRegex.test(username));
}

const checkPassword = (password) => {
    // consist of alphabet, digit and symbol
    passwordRegex = /^[a-zA-Z0-9!@#\$%\^&\*]+$/;
    return (
        password &&
        password.length >= 8 &&
        password.length <= 16 &&
        passwordRegex.test(password));
}

const loginFn = async (req, res) => {
    const info = req.body;
    console.log('login', info);
    if (Object.keys(info).length == 0) {
        console.log(`Error! Empty request body.`)
        return res.send({'error': 'Empty request body'});
    }
    const {username, password} = info;
    if (!checkUsername(username)) {
        console.log(`Error! Invalid username ${username}.`)
        return res.send({'error': 'Invalid username'});
    } else if (!checkPassword(password)) {
        console.log(`Error! Invalid password ${password}.`);
        return res.send({'error': 'Invalid password'});
    } else {
        getUser(AUTH_TABLE_NAME, username, (err, row) => {
            if (err) {
                return res.send({'error': err.message});
            } else if (!row) {
                console.log(`Error! Not such username: ${username}`);
                return res.send({'error': `Not such username: ${username}`});
            } else {
                const PHash = hashSync(password, row.Salt);

                if (PHash === row.Password) {
                    console.log(`User ${username} login success!`);
                    console.log(row)
                    // gen token
                    const token = signToken({
                            user_id: row.Id,
                            username: row.Username,
                        }, TOKEN_EXPIRATION);
                    return res.send({token, 'username': row.Username, 'email': row.Email, 'savedCanvas': row.SavedCanvas});
                } else {
                    console.log(`User ${username} login failed: Incorrect password!`);
                    return res.send({'error': 'Incorrect password'});
                }
            }
        });
    }
}

const registerFn = (req, res) => {
    const info = req.body;
    if (Object.keys(info).length == 0) {
        console.log(`Error! Empty request body.`)
        return res.send({'error': 'Empty request body'});
    }
    console.log('register', info);
    
    const {username, password} = info;
    if (!checkUsername(username)) {
        console.log(`Error! Invalid username ${username}.`)
        return res.send({'error': 'Invalid username'});
    } else if (!checkPassword(password)) {
        console.log(`Error! Invalid password ${password}.`);
        return res.send({'error': 'Invalid password'});
    } else {
        addUser(AUTH_TABLE_NAME, {username: username, password: password}, (err, row) => {
            if (err) {
                console.log('register error: ', err);
                return res.send({'error': err.message});
            } else {
                if (row) {
                    console.log(`Error! Username ${username} is already existed.`)
                    return res.send({'error': 'Existed username'});
                } else {
                    // auto login after successful register
                    console.log('auto login...');
                    getUser(AUTH_TABLE_NAME, username, (err, row) => {
                        if (err) {
                            return res.send({'error': err.message});
                        } else {
                            const PHash = hashSync(password, row.Salt);
                            if (PHash === row.Password) {
                                console.log(`User ${username} login success!`);
                                // gen token
                                const token = signToken({
                                        user_id: row.Id,
                                        username: row.Username,
                                    }, TOKEN_EXPIRATION);
                                return res.send({token});
                            } else {
                                console.log(`User ${username} login failed: Incorrect password!`);
                                return res.send({'error': 'Incorrect password'});
                            }
                        }
                    });
                }
            }
        });
    }
}

const getFn = (req, res) => {
    const {username, token, key }= req.body;
    if (!verifyToken(token)) return new Promise((resolve, reject) => resolve(res.send({'error': 'Invalid token', 'required': 'logout'})));
    getUserInfo(AUTH_TABLE_NAME, username, key[0].toUpperCase() + key.slice(1), (err, row) => {
        if (err) {
            return res.send({'error': err.message});
        } else {
            console.log(row);
            return res.send({key: row[key[0].toUpperCase() + key.slice(1)]});
        }
    });
}

const updateFn = (req, res) => {
    const {username, token, key, value} = req.body;
    if (!verifyToken(token)) return new Promise((resolve, reject) => {resolve(res.send({'error': 'Invalid token', 'required': 'logout'}))});

    if (key === 'password') {
        const PHash = hashSync(password, row.Salt);
        updateUser(AUTH_TABLE_NAME, username, 'Password', PHash, (err, row) => {
            if (err) {
                return res.send({'error': err.message});
            } else {
                getUser(AUTH_TABLE_NAME, username, (err, row) => {
                    if (err) {
                        return res.send({'error': err.message});
                    } else {
                        return res.send({});
                    }
                });
            }
        });
    } else {
        console.log('update: ', {key, value, username});
        updateUser(AUTH_TABLE_NAME, username, key[0].toUpperCase() + key.slice(1), value, (err, row) => {
            if (err) {
                return res.send({'error': err.message});
            } else {
                getUser(AUTH_TABLE_NAME, username, (err, row) => {
                    if (err) {
                        return res.send({'error': err.message});
                    } else {
                        return res.send({key: row[key[0].toUpperCase() + key.slice(1)]});
                    }
                });
            }
        });
    }
};

const processRequest = {
    'login': loginFn,
    'register': registerFn,
    'update': updateFn,
    'get': getFn,
};

module.exports = processRequest;
