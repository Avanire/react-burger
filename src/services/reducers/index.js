import {combineReducers} from 'redux';
import {burgerIngredientsReducer} from './BurgerIngredients';
import {orderDetailsReducer} from "./OrderDetails";
import {authReducer} from "./Auth";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    orderDetails: orderDetailsReducer,
    auth: authReducer
});