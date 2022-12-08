import {API_URL} from "./constans";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getRequest = (url, option = {}) => {
    return fetch(url, option).then(res => checkResponse(res));
}

export const getIngredientsRequest = () => {
    return getRequest(`${API_URL}/ingredients`);
}

export const getOrderRequest = (ids) => {
    const body = {
        "ingredients": ids
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    return getRequest(`${API_URL}/orders`, options);
}