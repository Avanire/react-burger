import {getIngredientsRequest} from '../../utils/burger-api';
import {createAction} from '@reduxjs/toolkit';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_MODAL_INGREDIENT,
    REMOVE_MODAL_INGREDIENT
} from '../../utils/constans';

export const burgerIngredientsRequest = createAction(GET_INGREDIENTS_REQUEST);
export const burgerIngredientsSuccess = createAction(GET_INGREDIENTS_SUCCESS);
export const burgerIngredientsFailed = createAction(GET_INGREDIENTS_FAILED);

export const addModalIngredient = createAction(ADD_MODAL_INGREDIENT);
export const removeModalIngredient = createAction(REMOVE_MODAL_INGREDIENT);

export function getBurgerIngredients() {
    return function (dispatch) {
        dispatch({
            type: burgerIngredientsRequest.type
        });
        getIngredientsRequest().then(res => {

            if (res && res.success) {
                dispatch({
                    type: burgerIngredientsSuccess.type,
                    ingredients: burgerIngredientsSuccess(res.data)
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
