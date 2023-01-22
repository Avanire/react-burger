import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./reducers";
import thunk from "redux-thunk";
import {socketMiddleware} from './middleware/SocketMiddleware';
import {onClose, onError, onMessage, onOpen, wsInit} from "./actions/WsActions";

export type TWsActions = typeof wsActions;

const wsActions = {
    wsInit,
    onClose,
    onError,
    onMessage,
    onOpen
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk).concat(socketMiddleware(wsActions)),
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;