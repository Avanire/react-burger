import {createAction} from '@reduxjs/toolkit';
import {ADD_INGREDIENT, REMOVE_INGREDIENT} from '../../utils/constans';

export const addIngredient = createAction(ADD_INGREDIENT);
export const removeIngredient = createAction(REMOVE_INGREDIENT);

