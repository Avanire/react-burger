import {createStore} from "effector";

export const $orderNumber = createStore(null);
export const $orderIsLoading = createStore(false);
export const $orderFailed = createStore(false);