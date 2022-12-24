import {createAction} from "@reduxjs/toolkit";
import {
    AUTH_FAILED,
    AUTH_REQUEST, FORGOT_PASSWORD,
    GET_USER,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_SUCCESS,
    REGISTRATION_SUCCESS, RESET_PASSWORD_ENTER, RESET_PASSWORD_SUCCESS,
    UPDATE_USER
} from '../../utils/constans';
import {
    forgotPasswordRequest,
    getUserRequest,
    loginRequest,
    logoutRequest,
    refreshTokenRequest,
    registrationRequest, resetPasswordRequest,
    updateUserRequest
} from "../../utils/burger-api";
import {toast} from "react-toast";
import {getError} from "../../utils/utils";

export const authRequest = createAction(AUTH_REQUEST);
export const authFailed = createAction(AUTH_FAILED);

export const registrationSuccess = createAction(REGISTRATION_SUCCESS);

export const loginSuccess = createAction(LOGIN_SUCCESS);

export const refreshTokenSuccess = createAction(REFRESH_TOKEN_SUCCESS);

export const logoutSuccess = createAction(LOGOUT_SUCCESS);

export const getUserSuccess = createAction(GET_USER);

export const updateUserSuccess = createAction(UPDATE_USER);

export const forgotPasswordSuccess = createAction(FORGOT_PASSWORD);
export const resetPasswordEnter = createAction(RESET_PASSWORD_ENTER);

export const resetPasswordSuccess = createAction(RESET_PASSWORD_SUCCESS);

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
                toast.error(res.message);
            }
        }).catch((e) => {
            dispatch({
                type: authFailed.type
            });
            getError(e.message)
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
        }).catch((e) => {
            dispatch({
                type: authFailed.type
            });
            getError(e.message)
        });
    }
}

export const refreshToken = () => {
    return function (dispatch) {
        dispatch({
            type: authRequest.type
        });

        refreshTokenRequest().then(res => {
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

export const logout = () => {
    return function (dispatch) {
        dispatch({
            type: authRequest.type
        });

        logoutRequest().then(res => {
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

export const getUser = () => {
    return function (dispatch) {
        dispatch({
            type: authRequest.type
        });

        getUserRequest().then(res => {
            if (res && res.success) {
                dispatch({
                    type: getUserSuccess.type,
                    user: res.user
                });
            } else {
                dispatch({
                    type: authFailed.type,
                    payload: res.message
                });
            }
        }).catch((e) => {
            if (e.message === 'jwt expired' || e.message === 'jwt malformed') {
                dispatch(refreshToken());
            } else {
                dispatch({
                    type: authFailed.type,
                    payload: e.message()
                });
            }
        });
    }
}

export const updateUser = (email, password, name) => {
    return function (dispatch) {
        dispatch({
            type: authRequest.type
        });

        updateUserRequest(email, password, name).then(res => {
            if (res && res.success) {
                dispatch({
                    type: updateUserSuccess.type,
                    user: res.user
                });
                toast.success('Данные сохранены');
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

export const forgotPassword = (email) => {
    return function(dispatch) {
        dispatch({
            type: authRequest.type
        });

        forgotPasswordRequest(email).then(res => {
            if (res && res.success) {
                dispatch({
                    type: forgotPasswordSuccess.type,
                    payload: res.success
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

export const resetPassword = (password, code) => {
    return function (dispatch) {
        dispatch({
            type: authRequest.type
        });

        resetPasswordRequest(password, code).then(res => {
            if (res && res.success) {
                dispatch({
                    type: resetPasswordSuccess.type
                });
            } else {
                dispatch({
                    type: authFailed.type
                });
            }
        }).catch((e) => {
            dispatch({
                type: authFailed.type
            });
            getError(e.message)
        });
    }
}