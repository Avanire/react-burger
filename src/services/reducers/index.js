import {combineReducers} from 'redux';
import {burgerIngredientsReducer} from './BurgerIngredients';
import {orderDetailsReducer} from "./OrderDetails";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    orderDetails: orderDetailsReducer
});