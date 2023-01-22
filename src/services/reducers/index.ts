import {combineReducers} from 'redux';
import {burgerIngredientsReducer} from './BurgerIngredients';
import {orderDetailsReducer} from "./OrderDetails";
import {authReducer} from "./Auth";
import {wsReducer} from './WsReducer';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    orderDetails: orderDetailsReducer,
    auth: authReducer,
    ws: wsReducer
});