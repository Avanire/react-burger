import type {Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch, RootState, TWsActions} from "../store";
import {getCookie} from "../../utils/utils";

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => action => {
            const {dispatch} = store;
            const {type, payload} = action;
            const {wsInit, onOpen, onClose, onError, onMessage} = wsActions;

            if (type === wsInit.type && getCookie('token')) {
                socket = new WebSocket(`${payload}?token=${getCookie('token')}`);
            } else if (type === wsInit.type) {
                socket = new WebSocket(payload);
            }

            if (socket?.url) {
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

                socket.onclose = () => {
                    dispatch({type: onClose.type});
                };
            }

            next(action);
        };
    }) as Middleware;
}