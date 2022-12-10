import {createEffect} from "effector";
import {getOrderRequest} from "../../utils/burger-api";

export const fetchOrderFx = createEffect(params => getOrderRequest(params));