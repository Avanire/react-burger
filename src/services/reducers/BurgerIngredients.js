import {createReducer} from '@reduxjs/toolkit';
import {
    burgerIngredientsRequest,
    burgerIngredientsSuccess,
    burgerIngredientsFailed,
    addModalIngredient,
    removeModalIngredient
} from '../actions/BurgerIngredients';

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    modalIngredient: {}
}

export const burgerIngredientsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(burgerIngredientsRequest, (state) => {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false
            }
        })
        .addCase(burgerIngredientsSuccess, (state, action) => {
            return {
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.ingredients.payload
            }
        })
        .addCase(burgerIngredientsFailed, (state) => {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true
            }
        })
        .addCase(addModalIngredient, (state, action) => {
            return {
                ...state,
                modalIngredient: action.ingredient
            }
        })
        .addCase(removeModalIngredient, (state) => {
            return {
                ...state,
                modalIngredient: {}
            }
        })
});