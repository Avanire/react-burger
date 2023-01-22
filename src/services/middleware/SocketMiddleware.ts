import type {Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch, RootState, TWsActions} from "../store";

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => action => {
            const {dispatch, getState} = store;
            const {type, payload} = action;
            const {wsInit, onOpen, onClose, onError, onMessage} = wsActions;
            const {user} = getState().auth;

            if (type === wsInit.type && user.token) {
                socket = new WebSocket(`${payload}?token=${user.token}`);
            } else if (type === wsInit.type) {
                socket = new WebSocket(payload);
            }

            if (socket) {

                socket.onopen = () => {
                    dispatch({type: onOpen.type});
                };

                socket.onerror = event => {
                    dispatch({type: onError.type, payload: event});
                };

                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);
                    const {success, ...restParsedData} = parsedData;

                    dispatch({type: onMessage.type, payload: restParsedData});
                };

                socket.onclose = event => {
                    dispatch({type: onClose.type, payload: event});
                };
            }

            next(action);
        };
    }) as Middleware;
}