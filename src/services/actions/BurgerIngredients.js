import {getIngredientsRequest} from '../../utils/burger-api';
import {createAction} from '@reduxjs/toolkit';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_MODAL_INGREDIENT,
    REMOVE_MODAL_INGREDIENT,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    ADD_BUN, CHANGE_POSITIONS
} from '../../utils/constans';

export const burgerIngredientsRequest = createAction(GET_INGREDIENTS_REQUEST);
export const burgerIngredientsSuccess = createAction(GET_INGREDIENTS_SUCCESS);
export const burgerIngredientsFailed = createAction(GET_INGREDIENTS_FAILED);

export const addIngredient = createAction(ADD_INGREDIENT);
export const removeIngredient = createAction(REMOVE_INGREDIENT);
export const addIngredientBun = createAction(ADD_BUN);

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
