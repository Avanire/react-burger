import {
    $constructorBun,
    $constructorIngredients,
    $ingredients,
    $isIngredientsFailed,
    $isIngredientsLoading,
    $modalIngredient
} from './store';
import {
    addIngredient,
    addIngredientBun,
    addModalIngredient,
    burgerIngredientsRequest,
    changePositions,
    clearIngredients,
    removeIngredient,
    removeModalIngredient
} from './event';

export const modelBurgerIngredients = {
    $ingredients,
    $isIngredientsLoading,
    $isIngredientsFailed,
    $constructorIngredients,
    $constructorBun,
    $modalIngredient,
    burgerIngredientsRequest,
    addIngredient,
    removeIngredient,
    addIngredientBun,
    clearIngredients,
    addModalIngredient,
    removeModalIngredient,
    changePositions
}