import {orderRequest} from './event';
import {$orderFailed, $orderIsLoading, $orderNumber} from "./store";

export const modelOrder = {
    orderRequest,
    $orderNumber,
    $orderIsLoading,
    $orderFailed
}