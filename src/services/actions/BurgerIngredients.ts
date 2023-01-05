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

export const burgerIngredientsRequest = createAction<boolean>(GET_INGREDIENTS_REQUEST);
export const burgerIngredientsSuccess = createAction<Array<TIngredient>>(GET_INGREDIENTS_SUCCESS);
export const burgerIngredientsFailed = createAction<boolean>(GET_INGREDIENTS_FAILED);

export const addIngredient = createAction<TIngredient>(ADD_INGREDIENT);
export const removeIngredient = createAction<TIngredient>(REMOVE_INGREDIENT);
export const addIngredientBun = createAction<TIngredient>(ADD_BUN);
export const clearIngredients = createAction<number>(CLEAR_INGREDIENTS);

export const addModalIngredient = createAction<TIngredient>(ADD_MODAL_INGREDIENT);
export const removeModalIngredient = createAction<boolean>(REMOVE_MODAL_INGREDIENT);

export const changePositions = createAction<TChangesPositionObject>(CHANGE_POSITIONS);

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
