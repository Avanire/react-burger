import {combineReducers} from 'redux';
import {burgerIngredientsReducer} from './BurgerIngredients';
import {burgerConstructorReducer} from './BurgerConstructor';
import {orderDetailsReducer} from "./OrderDetails";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer
});