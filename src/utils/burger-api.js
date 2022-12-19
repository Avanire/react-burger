import {API_URL} from "./constans";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getRequest = (url, option = {}) => {
    return fetch(url, option).then(res => checkResponse(res));
}

const postRequest = (endPoint, body) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    return getRequest(`${API_URL}/${endPoint}`, options);
}

export const getIngredientsRequest = () => {
    return getRequest(`${API_URL}/ingredients`);
}

export const getOrderRequest = (ids) => {
    const body = {
        "ingredients": ids
    }

    return postRequest('orders', body);
}

export const forgotPasswordRequest = (email) => {
    const body = {
        "email": email
    }

    return postRequest('password-reset', body);
}

export const resetPasswordRequest = (password, token) => {
    const body = {
        "password": password,
        "token": token
    }

    return postRequest('password-reset/reset', body);
}

export const registrationRequest = (email, password, name) => {
    const body = {
        "email": email,
        "password": password,
        "name": name
    }

    return postRequest('auth/register', body);
}

export const loginRequest = (email, password) => {
    const body = {
        "email": email,
        "password": password
    }

    return postRequest('auth/login', body);
}

export const refreshTokenRequest = (token) => {
    const body = {
        "token": token
    }

    return postRequest('auth/token', body);
}

export const logoutRequest = (token) => {
    const body = {
        "token": token
    }

    return postRequest('auth/logout', body);
}

export const getUserRequest = (token) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }

    return getRequest(`${API_URL}/auth/user`, options);
}

export const updateUserRequest = (email, password, name, token) => {
    const body = {
        "email": email,
        "password": password,
        "name": name
    }

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    }

    return getRequest(`${API_URL}/auth/user`, options);
}