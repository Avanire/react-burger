import {forward, sample} from "effector";
import {orderRequest} from './event';
import {$orderFailed, $orderIsLoading, $orderNumber} from "./store";
import {fetchOrderFx} from "./fx";
import {clearIngredients} from "../BurgerIngredients/event";


$orderNumber
    .on(fetchOrderFx.doneData, ((_, result) => result.order.number));

$orderIsLoading
    .on(fetchOrderFx.pending, (_, isPending) => isPending);

$orderFailed
    .on(fetchOrderFx.fail, (_, isFailed) => isFailed);

forward({
    from: orderRequest,
    to: fetchOrderFx
})

sample({
    clock: fetchOrderFx.done,
    target: clearIngredients
});



