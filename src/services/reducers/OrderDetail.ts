import {createReducer} from "@reduxjs/toolkit";
import {addOrderModal, removeOrderModal} from "../actions/OrderDetail";
import {IFeedOrders} from "../../utils/prop-types";

const initialState: {modalOrder: IFeedOrders | null} = {
    modalOrder: null
}

export const orderDetailReducer = createReducer(initialState, builder => {
    builder
        .addCase(addOrderModal, (state, action) => {
            return {
                modalOrder: action.payload
            }
        })
        .addCase(removeOrderModal, () => {
            return {
                modalOrder: null
            }
        })
});