import {createStore} from "effector";

export const $ingredients = createStore([]);
export const $isIngredientsLoading = createStore(false);
export const $isIngredientsFailed = createStore(false);

export const $constructorIngredients = createStore([]);
export const $constructorBun = createStore(null);

export const $modalIngredient = createStore(null);
