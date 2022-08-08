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

export async function updatePasswordRequest(username, token, password) {
    const credentials = {username, token, password, type:'updatePassword'};
    return sendRequest(credentials);
}

export async function updateEmailRequest(username, token, email) {
    const credentials = {username, token, email, type:'updateEmail'};
    return sendRequest(credentials);
}

export async function getEmailRequest(username, token) {
    const credentials = {username, token, type:'getEmail'};
    return sendRequest(credentials);
}
