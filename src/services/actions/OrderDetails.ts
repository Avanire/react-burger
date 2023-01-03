import {createAction} from '@reduxjs/toolkit';
import {getOrderRequest} from "../../utils/burger-api";
import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../../utils/constans";
import {clearIngredients} from "./BurgerIngredients";
import {IDispatch} from "../../utils/prop-types";

export const orderRequest = createAction<boolean>(GET_ORDER_REQUEST);
export const orderSuccess = createAction<number>(GET_ORDER_SUCCESS);
export const orderFailed = createAction<boolean>(GET_ORDER_FAILED);


export function getOrder(ids: Array<string>) {
    return function (dispatch: (obj: IDispatch) => void) {
        dispatch({
            type: orderRequest.type
        });

        getOrderRequest(ids).then(res => {
            if (res && res.success) {
                dispatch({
                    type: orderSuccess.type,
                    payload: res.order.number
                });
                dispatch({
                    type: clearIngredients.type
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