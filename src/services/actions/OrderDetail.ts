import {createAction} from "@reduxjs/toolkit";
import {IFeedOrders} from "../../utils/prop-types";
import {ADD_MODAL_ORDER, REMOVE_MODAL_ORDER} from "../../utils/constans";

export const addOrderModal = createAction<IFeedOrders, typeof ADD_MODAL_ORDER>(ADD_MODAL_ORDER);
export const removeOrderModal = createAction<boolean, typeof REMOVE_MODAL_ORDER>(REMOVE_MODAL_ORDER);