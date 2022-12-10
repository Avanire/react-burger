import {createEvent} from "effector";

export const burgerIngredientsRequest = createEvent();

export const addIngredient = createEvent();
export const removeIngredient = createEvent();
export const addIngredientBun = createEvent();
export const clearIngredients = createEvent();

export const addModalIngredient = createEvent();
export const removeModalIngredient = createEvent();

export const changePositions = createEvent();

