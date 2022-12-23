import {createReducer} from '@reduxjs/toolkit';
import uuid from 'react-uuid';
import {
    addIngredient,
    addIngredientBun,
    addModalIngredient,
    burgerIngredientsFailed,
    burgerIngredientsRequest,
    burgerIngredientsSuccess,
    changePositions,
    clearIngredients,
    removeIngredient,
    removeModalIngredient,
} from '../actions/BurgerIngredients';

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    constructorIngredients: [],
    constructorBun: null,
    modalIngredient: null
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
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.payload
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
                modalIngredient: action.payload
            }
        })
        .addCase(removeModalIngredient, (state) => {
            return {
                ...state,
                modalIngredient: null
            }
        })
        .addCase(addIngredient, (state, action) => {
            const ingredient = state.ingredients.find(item => item._id === action.payload._id);

            const newIngredient = {
                ...ingredient,
                count: ingredient.count ? ingredient.count + 1 : 1
            }

            return {
                ...state,
                ingredients: [...state.ingredients].map(item => item._id === newIngredient._id ? newIngredient : item),
                constructorIngredients: [...state.constructorIngredients, {...ingredient, constructorId: uuid()}]
            }
        })
        .addCase(removeIngredient, (state, action) => {
            const ingredient = state.ingredients.find(item => item._id === action.payload._id);

            const newIngredient = {
                ...ingredient,
                count: ingredient.count - 1,
            }

            return {
                ...state,
                ingredients: [...state.ingredients].map(item => item._id === newIngredient._id ? newIngredient : item),
                constructorIngredients: [...state.constructorIngredients].filter(item => item.constructorId !== action.payload.constructorId)
            }
        })
        .addCase(addIngredientBun, (state, action) => {
            const oldBun = {
                ...state.constructorBun,
                count: 0
            }

            const bun = {
                ...action.payload,
                count: action.payload.count ? 2 : 2,
            }

            return {
                ...state,
                ingredients: [...state.ingredients].map(item => item._id === oldBun._id ? oldBun : item).map(item => item._id === bun._id ? bun : item),
                constructorBun: bun
            }
        })
        .addCase(changePositions, (state, action) => {
            const newCart = [...state.constructorIngredients];
            const dragCards = newCart[action.payload.index];
            newCart.splice(action.payload.index, 1);
            newCart.splice(action.payload.atIndex, 0, dragCards);

            return {
                ...state,
                constructorIngredients: newCart
            }
        })
        .addCase(clearIngredients, (state) => {
            return {
                ...state,
                constructorIngredients: [],
                constructorBun: null
            }
        })
});