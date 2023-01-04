import {toast} from "react-toast";
import {
    DEFAULT_ERROR,
    INCORRECT_EMAIL_OR_PASSWORD, INGREDIENT_NOT_FOUND,
    NAME_OCCUPIED,
    REGISTRATION_FIELDS_REQUIRED,
    WRONG_EMAIL_CODE
} from "./constans";
import {TErrors} from "./prop-types";

export const getCookie = (name: string): string | undefined => {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    );

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

type TProps = {
    [name: string]: string | number | boolean | Date | undefined;
    expires?: Date | number | string;
};

export const setCookie = (name: string, value: string | number | boolean, props: TProps = {}) => {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp instanceof Date && exp) {
        exp = exp.toUTCString();
    }
    const cookieValue: string = encodeURIComponent(value);
    let updatedCookie: string = name + '=' + cookieValue;

    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export const deleteCookie = (name: string) => {
    setCookie(name, '', { expires: -1 });
}

const ERRORS: TErrors = {
    'Email, password and name are required fields': REGISTRATION_FIELDS_REQUIRED,
    'User already exists': NAME_OCCUPIED,
    'Incorrect reset token': WRONG_EMAIL_CODE,
    'email or password are incorrect': INCORRECT_EMAIL_OR_PASSWORD,
    'Ingredient not found': INGREDIENT_NOT_FOUND
}

export const getError = (error: string) => toast.error(ERRORS[error] || DEFAULT_ERROR);
