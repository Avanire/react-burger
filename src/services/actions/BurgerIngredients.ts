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
import {TIngredient, TChangesPositionObject} from "../../utils/prop-types";
import {AppDispatch} from "../store";

export const burgerIngredientsRequest = createAction<boolean, typeof GET_INGREDIENTS_REQUEST>(GET_INGREDIENTS_REQUEST);
export const burgerIngredientsSuccess = createAction<Array<TIngredient>, typeof GET_INGREDIENTS_SUCCESS>(GET_INGREDIENTS_SUCCESS);
export const burgerIngredientsFailed = createAction<boolean, typeof GET_INGREDIENTS_FAILED>(GET_INGREDIENTS_FAILED);

export const addIngredient = createAction<TIngredient, typeof ADD_INGREDIENT>(ADD_INGREDIENT);
export const removeIngredient = createAction<TIngredient, typeof REMOVE_INGREDIENT>(REMOVE_INGREDIENT);
export const addIngredientBun = createAction<TIngredient, typeof ADD_BUN>(ADD_BUN);
export const clearIngredients = createAction<boolean, typeof CLEAR_INGREDIENTS>(CLEAR_INGREDIENTS);

export const addModalIngredient = createAction<TIngredient, typeof ADD_MODAL_INGREDIENT>(ADD_MODAL_INGREDIENT);
export const removeModalIngredient = createAction<boolean, typeof REMOVE_MODAL_INGREDIENT>(REMOVE_MODAL_INGREDIENT);

export const changePositions = createAction<TChangesPositionObject, typeof CHANGE_POSITIONS>(CHANGE_POSITIONS);

export function getBurgerIngredients() {
    return function (dispatch: AppDispatch) {
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
