import {createAction} from "@reduxjs/toolkit";
import {IWsFeedOrders} from "../../utils/prop-types";
import {AppDispatch} from "../store";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_URL
} from "../../utils/constans";

export const wsInit = createAction<Event, typeof WS_CONNECTION_START>(WS_CONNECTION_START);
export const onOpen = createAction<Event, typeof WS_CONNECTION_SUCCESS>(WS_CONNECTION_SUCCESS);
export const onError = createAction<Event, typeof WS_CONNECTION_ERROR>(WS_CONNECTION_ERROR);
export const onClose = createAction<Event, typeof WS_CONNECTION_CLOSED>(WS_CONNECTION_CLOSED);
export const onMessage = createAction<IWsFeedOrders, typeof WS_GET_MESSAGE>(WS_GET_MESSAGE);


export function wsInitAllOrders(endpoint?: string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: wsInit.type,
            payload: `${WS_URL}${endpoint ? '/' + endpoint : ''}`
        })
    }
}