import {createReducer} from "@reduxjs/toolkit";
import {
    authFailed,
    authRequest,
    getUserSuccess,
    loginSuccess,
    logoutSuccess,
    refreshTokenSuccess,
    registrationSuccess,
    updateUserSuccess
} from '../actions/Auth';
import {deleteCookie, setCookie} from "../../utils/utils";

const initialState = {
    user: null,
    accessToken: null,
    request: false,
    failed: false
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
        .addCase(authFailed, state => {
            return {
                ...state,
                request: false,
                failed: true
            }
        })
        .addCase(registrationSuccess, (state, action) => {
            setCookie('refreshToken', action.refreshToken);
            setCookie('token', action.accessToken.split('Bearer ')[1]);

            return {
                user: {
                    email: action.user.email,
                    name: action.user.name
                },
                accessToken: action.accessToken,
                request: false,
                failed: false
            }
        })
        .addCase(loginSuccess, (state, action) => {
            setCookie('refreshToken', action.refreshToken);
            setCookie('token', action.accessToken.split('Bearer ')[1]);

            return {
                user: {
                    email: action.user.email,
                    name: action.user.name
                },
                accessToken: action.accessToken,
                request: false,
                failed: false
            }
        })
        .addCase(refreshTokenSuccess, (state, action) => {
            setCookie('refreshToken', action.refreshToken);
            setCookie('token', action.accessToken.split('Bearer ')[1]);

            return {
                ...state,
                accessToken: action.accessToken,
                request: false,
                failed: false
            }
        })
        .addCase(logoutSuccess, () => {
            deleteCookie('token');
            deleteCookie('refreshToken');

            return {
                user: null,
                accessToken: '',
                request: false,
                failed: false
            }
        })
        .addCase(getUserSuccess, (state, action) => {
            return {
                ...state,
                user: {
                    email: action.user.email,
                    name: action.user.name
                },
                request: false,
                failed: false
            }
        })
        .addCase(updateUserSuccess, (state, action) => {
            return {
                ...state,
                user: {
                    email: action.user.email,
                    name: action.user.name
                },
                request: false,
                failed: false
            }
        })
});