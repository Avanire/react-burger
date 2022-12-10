import {forward} from 'effector';
import uuid from 'react-uuid';

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
import {fetchIngredientsFX} from './fx';

$ingredients
    .on(fetchIngredientsFX.doneData, (_, res) => res.data)
    .on(addIngredientBun, (ingredients, bun) => {
        return [...ingredients].map(item => item.type === 'bun' ? {
            ...item,
            count: 0
        } : item).map(item => item._id === bun._id ? {...bun, count: 2} : item);
    })
    .on(addIngredient, (ingredients, currentIngredient) => {
        return [...ingredients].map(item => item._id === currentIngredient._id ? (item.count ? {
            ...item,
            count: item.count + 1
        } : {...item, count: 1}) : item);
    })
    .on(removeIngredient, (ingredients, currentIngredient) => {
        return [...ingredients].map(item => item._id === currentIngredient._id ? {
            ...item,
            count: item.count - 1
        } : item);
    })
    .on(clearIngredients, (ingredients) => {
        return [...ingredients].map(item => item.count > 0 ? {...item, count: 0} : item);
    });

$isIngredientsLoading
    .on(fetchIngredientsFX.pending, (_, isPending) => isPending);

$isIngredientsFailed
    .on(fetchIngredientsFX.fail, (_, isFail) => isFail);

$modalIngredient
    .on(addModalIngredient, (_, ingredient) => ingredient)
    .on(removeModalIngredient, () => null);

$constructorBun
    .on(addIngredientBun, (_, bun) => bun)
    .reset(clearIngredients);

$constructorIngredients
    .on(addIngredient, (constructorIngredients, currentIngredient) => {
        return [...constructorIngredients, {...currentIngredient, constructorId: uuid()}];
    })
    .on(removeIngredient, (constructorIngredients, currentIngredient) => {
        return [...constructorIngredients].filter(item => item.constructorId !== currentIngredient.constructorId);
    })
    .on(changePositions, (constructorIngredients, {card, index, atIndex}) => {
        const newCart = [...constructorIngredients];

        newCart.splice(index, 1);
        newCart.splice(atIndex, 0, card);

        return newCart;
    })
    .reset(clearIngredients);

forward({
    from: burgerIngredientsRequest,
    to: fetchIngredientsFX
});