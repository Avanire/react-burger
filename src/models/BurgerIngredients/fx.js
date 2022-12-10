import {createEffect} from "effector";
import {getIngredientsRequest} from '../../utils/burger-api';

export const fetchIngredientsFX = createEffect(getIngredientsRequest);