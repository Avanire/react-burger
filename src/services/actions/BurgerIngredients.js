import {getIngredientsRequest} from '../../utils/burger-api';
import {createAction} from '@reduxjs/toolkit';
import {
    ADD_BUN,
    ADD_INGREDIENT,
    ADD_MODAL_INGREDIENT,
    CHANGE_POSITIONS,
    CLEAR_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    REMOVE_INGREDIENT,
    REMOVE_MODAL_INGREDIENT
} from '../../utils/constans';

export const burgerIngredientsRequest = createAction(GET_INGREDIENTS_REQUEST);
export const burgerIngredientsSuccess = createAction(GET_INGREDIENTS_SUCCESS);
export const burgerIngredientsFailed = createAction(GET_INGREDIENTS_FAILED);

export const addIngredient = createAction(ADD_INGREDIENT);
export const removeIngredient = createAction(REMOVE_INGREDIENT);
export const addIngredientBun = createAction(ADD_BUN);
export const clearIngredients = createAction(CLEAR_INGREDIENTS);

export const addModalIngredient = createAction(ADD_MODAL_INGREDIENT);
export const removeModalIngredient = createAction(REMOVE_MODAL_INGREDIENT);

export const changePositions = createAction(CHANGE_POSITIONS);

export function getBurgerIngredients() {
    return function (dispatch) {
        dispatch({
            type: burgerIngredientsRequest.type
        });
        getIngredientsRequest().then(res => {
            if (res && res.success) {
                dispatch({
                    type: burgerIngredientsSuccess.type,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: burgerIngredientsFailed.type
                });
            }
        }).catch(() => {
            dispatch({
                type: burgerIngredientsFailed.type
            });
        });
    }
}
