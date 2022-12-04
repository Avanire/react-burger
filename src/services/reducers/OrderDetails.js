import {createReducer} from '@reduxjs/toolkit';
import {orderRequest, orderSuccess, orderFailed} from '../actions/OrderDetails';

const initialState = {
    number: null,
    orderRequest: false,
    orderFailed: false
}

export const orderDetailsReducer = createReducer(initialState, (builder) => {
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
                number: action.order.number
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