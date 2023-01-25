import {createReducer} from "@reduxjs/toolkit";
import {
    authFailed,
    authRequest,
    forgotPasswordSuccess,
    getUserSuccess,
    loginSuccess,
    logoutSuccess,
    refreshTokenSuccess,
    registrationSuccess,
    resetPasswordEnter,
    resetPasswordSuccess,
    updateUserSuccess
} from '../actions/Auth';
import {deleteCookie, getCookie, setCookie} from "../../utils/utils";
import {IInitialStateAuth} from "../../utils/prop-types";

const initialState: IInitialStateAuth = {
    user: {
        name: '',
        email: '',
        token: getCookie('token')
    },
    isAuth: !!getCookie('token'),
    request: false,
    failed: false,
    isResetPass: false
}

export const authReducer = createReducer(initialState, builder => {
    builder
        .addCase(authRequest, state => {
            return {
                ...state,
                request: true,
                failed: false
            }
        })
        .addCase(authFailed, (state) => {
            return {
                ...state,
                request: false,
                failed: true
            }
        })
        .addCase(registrationSuccess, (state, action) => {
            setCookie('refreshToken', action.payload.refreshToken);
            setCookie('token', action.payload.accessToken.split('Bearer ')[1]);

            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.payload.user.email,
                    name: action.payload.user.name
                },
                request: false,
                failed: false
            }
        })
        .addCase(loginSuccess, (state, action) => {
            setCookie('refreshToken', action.payload.refreshToken);
            setCookie('token', action.payload.accessToken.split('Bearer ')[1]);

            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.payload.user.email,
                    name: action.payload.user.name
                },
                request: false,
                failed: false,
                isAuth: true
            }
        })
        .addCase(refreshTokenSuccess, (state, action) => {
            setCookie('refreshToken', action.payload.refreshToken);
            setCookie('token', action.payload.accessToken.split('Bearer ')[1]);

            return {
                ...state,
                request: false,
                failed: false
            }
        })
        .addCase(logoutSuccess, () => {
            deleteCookie('token');
            deleteCookie('refreshToken');

            return {
                user: {
                    name: '',
                    email: '',
                    token: undefined
                },
                isAuth: false,
                request: false,
                failed: false,
                isResetPass: false
            }
        })
        .addCase(getUserSuccess, (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.payload.user.email,
                    name: action.payload.user.name
                },
                request: false,
                failed: false
            }
        })
        .addCase(updateUserSuccess, (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.payload.user.email,
                    name: action.payload.user.name
                },
                request: false,
                failed: false
            }
        })
        .addCase(forgotPasswordSuccess, (state, action) => {
            return {
                ...state,
                isResetPass: action.payload,
                request: false,
                failed: false
            }
        })
        .addCase(resetPasswordEnter, (state) => {
            return {
                ...state,
                isResetPass: false,
                request: false,
                failed: false
            }
        })
        .addCase(resetPasswordSuccess, (state) => {
            return {
                ...state,
                request: false,
                failed: false
            }
        })
});