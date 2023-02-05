import {authReducer} from './Auth';
import {
    authFailed,
    authRequest,
    forgotPasswordSuccess,
    getUserSuccess,
    loginSuccess,
    logoutSuccess,
    registrationSuccess,
    resetPasswordEnter,
    updateUserSuccess
} from "../actions/Auth";

const initialState = {
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

const payloadUser = {
    user: {
        name: 'some name',
        email: 'test@mail.ru'
    },
    accessToken: 'accessToken',
    refreshToken: 'refreshToken'
}

describe('Auth reducer', () => {
    it('should return initial state', function () {
        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it('should return auth request success', function () {
        expect(authReducer(initialState, {
            type: authRequest.type
        })).toEqual({
            ...initialState,
            request: true
        });
    });

    it('should return auth request failed', function () {
        expect(authReducer(initialState, {
            type: authFailed.type
        })).toEqual({
            ...initialState,
            failed: true
        });
    });

    it('should be registration success', function () {
        expect(authReducer(initialState, {
            type: registrationSuccess.type,
            payload: payloadUser
        })).toEqual({
            ...initialState,
            user: {
                ...initialState.user,
                name: payloadUser.user.name,
                email: payloadUser.user.email
            }
        });
    });

    it('should be user login', function () {
        expect(authReducer(initialState, {
            type: loginSuccess.type,
            payload: payloadUser
        })).toEqual({
            ...initialState,
            user: {
                ...initialState.user,
                name: payloadUser.user.name,
                email: payloadUser.user.email
            },
            isAuth: true
        });
    });

    it('should logout user', function () {
        const initState = {
            ...initialState,
            user: {
                ...initialState.user,
                name: 'some name',
                email: 'test@mail.ru'
            },
            isAuth: true
        }

        expect(authReducer(initState, {
            type: logoutSuccess.type
        })).toEqual({
            ...initialState,
            user: {
                name: '',
                email: '',
                token: undefined
            },
            isAuth: false
        });
    });

    it('should return user', function () {
        expect(authReducer(initialState, {
            type: getUserSuccess.type,
            payload: payloadUser
        })).toEqual({
            ...initialState,
            user: {
                ...initialState.user,
                name: payloadUser.user.name,
                email: payloadUser.user.email
            }
        });
    });

    it('should be update user info', function () {
        const expectUserName = 'updated name';

        expect(authReducer({
            ...initialState,
            user: {
                ...initialState.user,
                name: payloadUser.user.name,
                email: payloadUser.user.email
            }
        }, {
            type: updateUserSuccess.type,
            payload: {
                ...payloadUser,
                user: {
                    ...payloadUser.user,
                    name: expectUserName
                }
            }
        })).toEqual({
            ...initialState,
            user: {
                ...initialState.user,
                name: expectUserName,
                email: payloadUser.user.email
            }
        });
    });

    it('should send request forgot password', function () {
        expect(authReducer(initialState, {
            type: forgotPasswordSuccess.type,
            payload: true
        })).toEqual({
            ...initialState,
            isResetPass: true
        });
    });

    it('should reset password succcess', function () {
        expect(authReducer({
            ...initialState,
            isResetPass: true
        }, {
            type: resetPasswordEnter.type
        })).toEqual({
            ...initialState,
            isResetPass: false
        });
    });
});