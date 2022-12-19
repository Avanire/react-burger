import {createAction} from "@reduxjs/toolkit";
import {
    AUTH_FAILED,
    AUTH_REQUEST, GET_USER,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_SUCCESS,
    REGISTRATION_SUCCESS, UPDATE_USER
} from '../../utils/constans';
import {
    getUserRequest,
    loginRequest,
    logoutRequest,
    refreshTokenRequest,
    registrationRequest, updateUserRequest
} from "../../utils/burger-api";
import {getCookie} from "../../utils/utils";

export const authRequest = createAction(AUTH_REQUEST);
export const authFailed = createAction(AUTH_FAILED);

export const registrationSuccess = createAction(REGISTRATION_SUCCESS);

export const loginSuccess = createAction(LOGIN_SUCCESS);

export const refreshTokenSuccess = createAction(REFRESH_TOKEN_SUCCESS);

export const logoutSuccess = createAction(LOGOUT_SUCCESS);

export const getUserSuccess = createAction(GET_USER);

export const updateUserSuccess = createAction(UPDATE_USER);

export const registration = (email, password, name) => {
    return function (dispatch) {
        dispatch({
            type: authRequest.type
        });

        registrationRequest(email, password, name).then(res => {
            if (res && res.success) {
                dispatch({
                    type: registrationSuccess.type,
                    user: res.user,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken
                });
            } else {
                dispatch({
                    type: authFailed.type
                });
            }
        }).catch(() => {
            dispatch({
                type: authFailed.type
            });
        });
    }
}

export const login = (email, password) => {
    return function (dispatch) {
        dispatch({
            type: authRequest.type
        });

        loginRequest(email, password).then(res => {
            if (res && res.success) {
                dispatch({
                    type: loginSuccess.type,
                    user: res.user,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken
                });
            } else {
                dispatch({
                    type: authFailed.type
                });
            }
        }).catch(() => {
            dispatch({
                type: authFailed.type
            });
        });
    }
}

export const refreshToken = (token) => {
    return function (dispatch) {
        dispatch({
            type: authRequest.type
        });

        refreshTokenRequest(token).then(res => {
            if (res && res.success) {
                dispatch({
                    type: refreshTokenSuccess.type,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken
                });
            } else {
                dispatch({
                    type: authFailed.type
                });
            }
        }).catch(() => {
            dispatch({
                type: authFailed.type
            });
        });
    }
}

export const logout = (token) => {
    return function (dispatch) {
        dispatch({
            type: authRequest.type
        });

        logoutRequest(token).then(res => {
            if (res && res.success) {
                dispatch({
                    type: logoutSuccess.type
                });
            } else {
                dispatch({
                    type: authFailed.type
                });
            }
        }).catch(() => {
            dispatch({
                type: authFailed.type
            });
        });
    }
}

export const getUser = (token) => {
    return function (dispatch) {
        dispatch({
            type: authRequest.type
        });

        getUserRequest(token).then(res => {
            if (res && res.success) {
                dispatch({
                    type: getUserSuccess.type,
                    user: res.user
                });
            } else {
                dispatch({
                    type: authFailed.type
                });
            }
        }).catch((e) => {
            if (e.message === 'jwt expired') {
                const token = getCookie('refreshToken');
                dispatch(refreshToken(token));
            } else {
                dispatch({
                    type: authFailed.type
                });
            }
        });
    }
}

export const updateUser = (email, password, name, token) => {
    return function(dispatch) {
        dispatch({
            type: authRequest.type
        });

        updateUserRequest(email, password, name, token).then(res => {
            if (res && res.success) {
                dispatch({
                    type: updateUserSuccess.type,
                    user: res.user
                });
            } else {
                dispatch({
                    type: authFailed.type
                });
            }
        }).catch(() => {
            dispatch({
                type: authFailed.type
            });
        });
    }
}