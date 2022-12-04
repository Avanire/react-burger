import {createReducer} from '@reduxjs/toolkit';
import {addIngredient, removeIngredient} from '../actions/BurgerConstructor';

const initialState = {
    constructorIngredients: []
}

export const burgerConstructorReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addIngredient, (state, action) => {
            return {
                constructorIngredients: [...state, action.payload]
            }
        })
        .addCase(removeIngredient, (state, action) => {
            return {
                constructorIngredients: [...state].constructorIngredients.filter(item => item !== action.payload)
            }
        })
});