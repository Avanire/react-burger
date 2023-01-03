import {API_URL} from "./constans";
import {getCookie} from "./utils";
import {TBody} from "./prop-types";

const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err: string) => Promise.reject(err));
};

const getRequest = (url: string, option = {}) => {
    return fetch(url, option).then(res => checkResponse(res));
}

const postRequest = (endPoint:string , body: TBody) => {
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

export const getOrderRequest = (ids: Array<string>) => {
    const body = {
        "ingredients": ids
    }

    return postRequest('orders', body);
}

export const forgotPasswordRequest = (email: string) => {
    const body = {
        "email": email
    }

    return postRequest('password-reset', body);
}

export const resetPasswordRequest = (password: string, code: string) => {
    const body = {
        "password": password,
        "token": code
    }

    return postRequest('password-reset/reset', body);
}

export const registrationRequest = (email: string, password: string, name: string) => {
    const body = {
        "email": email,
        "password": password,
        "name": name
    }

    return postRequest('auth/register', body);
}

export const loginRequest = (email: string, password: string) => {
    const body = {
        "email": email,
        "password": password
    }

    return postRequest('auth/login', body);
}

export const refreshTokenRequest = () => {
    const body = {
        "token": getCookie('refreshToken')
    }

    return postRequest('auth/token', body);
}

export const logoutRequest = () => {
    const body = {
        "token": getCookie('refreshToken')
    }

    return postRequest('auth/logout', body);
}

export const getUserRequest = () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('token')
        }
    }

    return getRequest(`${API_URL}/auth/user`, options);
}

export const updateUserRequest = (email: string, password: string, name: string) => {
    const body = {
        "email": email,
        "password": password,
        "name": name
    }

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify(body)
    }

    return getRequest(`${API_URL}/auth/user`, options);
}