import {burgerIngredientsReducer} from './BurgerIngredients';
import {
    addIngredient,
    addIngredientBun,
    addModalIngredient,
    burgerIngredientsFailed,
    burgerIngredientsRequest,
    burgerIngredientsSuccess,
    changePositions,
    clearIngredients,
    removeIngredient,
    removeModalIngredient
} from '../actions/BurgerIngredients';
import {data} from "../../utils/data-test";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    constructorIngredients: [],
    constructorBun: null,
    modalIngredient: null
};

describe('BurgerIngredients reducer', () => {
    it('should return initial state', () => {
        expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState);
    });

    it('handle burgerIngredientsRequest', function () {
        expect(burgerIngredientsReducer(initialState, {type: burgerIngredientsRequest.type})).toEqual({
            ...initialState,
            ingredients: [],
            ingredientsRequest: true,
            ingredientsFailed: false
        });
    });

    it('should get ingredients data', function () {
        expect(burgerIngredientsReducer(initialState, {
            type: burgerIngredientsSuccess.type,
            payload: data
        })).toEqual({
            ...initialState,
            ingredients: data,
            ingredientsRequest: false,
            ingredientsFailed: false
        });
    });

    it('should get failed ingredients request', function () {
        expect(burgerIngredientsReducer(initialState, {
            type: burgerIngredientsFailed.type
        })).toEqual({
            ...initialState,
            ingredientsFailed: true
        });
    });

    it('should be displayed in a modal window', function () {
        expect(burgerIngredientsReducer(initialState, {
            type: addModalIngredient.type,
            payload: data[0]
        })).toEqual({
            ...initialState,
            modalIngredient: data[0]
        });
    });

    it('should be removed ingredient in a modal window', function () {
        expect(burgerIngredientsReducer(initialState, {
            type: removeModalIngredient.type
        })).toEqual({
            ...initialState,
            modalIngredient: null
        });
    });

    it('should add ingredient in constructor', function () {
        const expectIngredients = data.map(item => item._id === data[0]._id ? {
            ...item,
            count: 1
        } : item);

        const expectConstructorIngredients = [{
            ...data[0],
            "constructorId": expect.stringMatching(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)
        }];

        const expectResult = {
            ...initialState,
            ingredients: expectIngredients,
            constructorIngredients: expectConstructorIngredients
        };

        expect(burgerIngredientsReducer({
            ...initialState,
            ingredients: data
        }, {
            type: addIngredient.type,
            payload: data[0]
        })).toEqual(expectResult);
    });

    it('should remove ingredient from constructor', function () {
        const initialConstructorIngredient = [
            {
                ...data[1],
                "constructorId": 'e7bb491e-02dd-976a-c6f1-2d7086a671b3'
            },
            {
                ...data[5],
                "constructorId": 'e7bb491e-02dd-976a-c671-2d7086a671b3'
            }
        ];

        const initialIngredients = data.map(item => item._id === data[1]._id || data[5]._id ? {
            ...item,
            count: 1
        } : item);

        const expectConstructorIngredient = [
            {
                ...data[5],
                "constructorId": 'e7bb491e-02dd-976a-c671-2d7086a671b3'
            }
        ];

        const expectIngredients = initialIngredients.map(item => item._id === data[1]._id ? {
            ...item,
            count: 0
        } : item);

        expect(burgerIngredientsReducer({
            ...initialState,
            ingredients: initialIngredients,
            constructorIngredients: initialConstructorIngredient
        }, {
            type: removeIngredient.type,
            payload: initialConstructorIngredient[0]
        })).toEqual({
            ...initialState,
            constructorIngredients: expectConstructorIngredient,
            ingredients: expectIngredients
        });
    });

    it('should add bun to constructor', function () {
        const bun = data[0];

        const expectedBun = {
            ...bun,
            count: 2
        };

        const expectedIngredients = data.map(item => item._id === bun._id ? {...item, count: 2} : item);

        expect(burgerIngredientsReducer({
            ...initialState,
            ingredients: data
        }, {
            type: addIngredientBun.type,
            payload: bun
        })).toEqual({
            ...initialState,
            ingredients: expectedIngredients,
            constructorBun: expectedBun
        });
    });

    it('should change bun in constructor', function () {
        const oldBun = data[0];

        const newBun = data[1];

        const expectedConstructorBun = {
            ...newBun,
            count: 2
        }

        const expectedIngredients = data.map(item => item._id === oldBun._id ? {
            ...item,
            count: 0
        } : item).map(item => item._id === newBun._id ? {...item, count: 2} : item);

        expect(burgerIngredientsReducer({
            ...initialState,
            ingredients: data,
            constructorBun: oldBun
        }, {
            type: addIngredientBun.type,
            payload: newBun
        })).toEqual({
            ...initialState,
            ingredients: expectedIngredients,
            constructorBun: expectedConstructorBun
        });
    });

    it('should change ingredient positions', function () {
        const initConstructorIngredients = [
            data[5],
            data[6],
            data[7]
        ];

        const expectedConstructorIngredients = [
            data[5],
            data[7],
            data[6]
        ];

        expect(burgerIngredientsReducer({
            ...initialState,
            constructorIngredients: initConstructorIngredients
        }, {
            type: changePositions.type,
            payload: {
                card: data[7],
                index: 2,
                atIndex: 1
            }
        })).toEqual({
            ...initialState,
            constructorIngredients: expectedConstructorIngredients
        });
    });

    it('should clear constructor and reset the counter', function () {
        const initBun = data[0];

        const initConstructor = [
            data[5],
            data[6]
        ];

        const initIngredients = data.map(item => item._id === data[5] || item._id === data[6] ? {
            ...item,
            count: 1
        } : item).map(item => item._id === data[0] ? {...item, count: 2} : item);

        expect(burgerIngredientsReducer({
            ...initialState,
            constructorBun: initBun,
            constructorIngredients: initConstructor,
            ingredients: initIngredients
        }, {
            type: clearIngredients.type
        })).toEqual({
            ...initialState,
            constructorBun: null,
            constructorIngredients: [],
            ingredients: initIngredients.map(item => item.count && item.count > 0 ? {...item, count: 0} : item)
        });
    });
});