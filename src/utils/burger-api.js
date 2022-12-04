import {API_URL} from "./constans";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredientsRequest = () => {
    return fetch(`${API_URL}/ingredients`)
        .then(res => checkResponse(res));
}

export const getOrderRequest = (ids) => {
    const body = {
        "ingredients": ids
    }

    return fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => checkResponse(res));
}