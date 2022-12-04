import {createAction} from '@reduxjs/toolkit';
import {getOrderRequest} from "../../utils/burger-api";
import {GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED} from "../../utils/constans";

export const orderRequest = createAction(GET_ORDER_REQUEST);
export const orderSuccess = createAction(GET_ORDER_SUCCESS);
export const orderFailed = createAction(GET_ORDER_FAILED);


export function getOrder(ids) {
    return function(dispatch) {
        dispatch({
            type: orderRequest.type
        });

        getOrderRequest(ids).then(res => {
            if (res && res.success) {
                dispatch({
                    type: orderSuccess.type,
                    number: orderSuccess(res.order.number)
                });
            } else {
                dispatch({
                    type: orderFailed.type
                });
            }
        }).catch(() => {
            dispatch({
                type: orderFailed.type
            });
        });
    }
}