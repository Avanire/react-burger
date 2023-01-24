import {createReducer} from '@reduxjs/toolkit';
import {orderRequest, orderSuccess, orderFailed} from '../actions/CheckDetail';
import {IInitialStateOrderDetails} from "../../utils/prop-types";

const initialState: IInitialStateOrderDetails = {
    number: null,
    orderRequest: false,
    orderFailed: false
}

export const checkDetailReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(orderRequest, (state) => {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false
            }
        })
        .addCase(orderSuccess, (state, action) => {
            return {
                orderRequest: false,
                orderFailed: false,
                number: action.payload
            }
        })
        .addCase(orderFailed, (state) => {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true
            }
        })
});