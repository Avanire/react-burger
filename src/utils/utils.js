import {toast} from "react-toast";
import {DEFAULT_ERROR, NAME_OCCUPIED, REGISTRATION_FIELDS_REQUIRED, WRONG_EMAIL_CODE} from "./constans";

export const getCookie = (name) => {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    );

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const setCookie = (name, value, props) => {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export const deleteCookie = (name) => {
    setCookie(name, null, { expires: -1 });
}

export const getError = (error) => {
    switch (error) {
        case 'Email, password and name are required fields':
            toast.error(REGISTRATION_FIELDS_REQUIRED)
            break
        case 'User already exists':
            toast.error(NAME_OCCUPIED)
            break
        case 'Incorrect reset token':
            toast.error(WRONG_EMAIL_CODE)
            break
        default:
            toast.error(DEFAULT_ERROR)
    }
}