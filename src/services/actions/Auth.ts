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
import {IDispatch, TTokenSuccess, TUserAuth} from "../../utils/prop-types";

export const authRequest = createAction<boolean>(AUTH_REQUEST);
export const authFailed = createAction<boolean>(AUTH_FAILED);

export const registrationSuccess = createAction<TUserAuth>(REGISTRATION_SUCCESS);

export const loginSuccess = createAction<TUserAuth>(LOGIN_SUCCESS);

export const refreshTokenSuccess = createAction<TTokenSuccess>(REFRESH_TOKEN_SUCCESS);

export const logoutSuccess = createAction<boolean>(LOGOUT_SUCCESS);

export const getUserSuccess = createAction<TUserAuth>(GET_USER);

export const updateUserSuccess = createAction<TUserAuth>(UPDATE_USER);

export const forgotPasswordSuccess = createAction<boolean>(FORGOT_PASSWORD);
export const resetPasswordEnter = createAction<boolean>(RESET_PASSWORD_ENTER);

export const resetPasswordSuccess = createAction<boolean>(RESET_PASSWORD_SUCCESS);

export const registration = (email: string, password: string, name: string) => {
    return function (dispatch: (obj: IDispatch) => void) {
        dispatch({
            type: authRequest.type
        });

        registrationRequest(email, password, name).then(res => {
            if (res && res.success) {
                dispatch({
                    type: registrationSuccess.type,
                    payload: res
                    /*user: {
                        name: res.user.name,
                        email: res.user.email
                    },
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken*/
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

export const login = (email: string, password: string) => {
    return function (dispatch: (obj: IDispatch) => void) {
        dispatch({
            type: authRequest.type
        });

        loginRequest(email, password).then(res => {
            if (res && res.success) {
                dispatch({
                    type: loginSuccess.type,
                    payload: res
                    /*user: res.user,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken*/
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
    return function (dispatch: (obj: IDispatch) => void) {
        dispatch({
            type: authRequest.type
        });

        refreshTokenRequest().then(res => {
            if (res && res.success) {
                dispatch({
                    type: refreshTokenSuccess.type,
                    payload: res
                    /*accessToken: res.accessToken,
                    refreshToken: res.refreshToken*/
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
    return function (dispatch: (obj: IDispatch) => void) {
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
    return function (dispatch: (obj: IDispatch) => void) {
        dispatch({
            type: authRequest.type
        });

        getUserRequest().then(res => {
            if (res && res.success) {
                dispatch({
                    type: getUserSuccess.type,
                    payload: res
                });
            } else {
                dispatch({
                    type: authFailed.type,
                    payload: res.message
                });
            }
        }).catch((e) => {
            if (e.message === 'jwt expired' || e.message === 'jwt malformed') {
                refreshToken();
            } else {
                dispatch({
                    type: authFailed.type,
                    payload: e.message()
                });
            }
        });
    }
}

export const updateUser = (email: string, password: string, name: string) => {
    return function (dispatch: (obj: IDispatch) => void) {
        dispatch({
            type: authRequest.type
        });

        updateUserRequest(email, password, name).then(res => {
            if (res && res.success) {
                dispatch({
                    type: updateUserSuccess.type,
                    payload: res
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

export const forgotPassword = (email: string) => {
    return function(dispatch: (obj: IDispatch) => void) {
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

export const resetPassword = (password: string, code: string) => {
    return function (dispatch: (obj: IDispatch) => void) {
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