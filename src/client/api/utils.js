async function sendRequest(credentials) {
    return fetch('http://localhost:8080/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then(data => data.json());
}

export async function submitUserRequest(username, password, type) {
    const credentials = {username, password, type};
    return sendRequest(credentials);
}

export async function updateUserRequest(username, token, key, value) {
    const credentials = {username, token, key, value, type:'update'};
    return sendRequest(credentials);
}

export async function getUserRequest(username, token, key) {
    const credentials = {username, token, key, type:'get'};
    return sendRequest(credentials);
}

