import {combineReducers} from 'redux';
import {burgerIngredientsReducer} from './BurgerIngredients';
import {checkDetailReducer} from "./CheckDetail";
import {authReducer} from "./Auth";
import {wsReducer} from './WsReducer';
import {orderDetailReducer} from "./OrderDetail";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    checkDetails: checkDetailReducer,
    auth: authReducer,
    ws: wsReducer,
    orderDetail: orderDetailReducer
});