import {createReducer} from "@reduxjs/toolkit";
import {onClose, onError, onMessage, onOpen} from "../actions/WsActions";
import {TWSState} from "../../utils/prop-types";

const initialState: TWSState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
}

export const wsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(onOpen, (state) => {
            return {
                ...state,
                error: undefined,
                wsConnected: true
            }
        })
        .addCase(onError, (state, action) => {
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            }
        })
        .addCase(onClose, (state, action) => {
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            }
        })
        .addCase(onMessage, (state, action) => {

            return {
                ...state,
                orders: [action.payload.orders],
                total: action.payload.total,
                totalToday: action.payload.totalToday
            }
        })
});