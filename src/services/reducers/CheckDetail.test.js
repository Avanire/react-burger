import {checkDetailReducer} from './CheckDetail';
import {orderFailed, orderRequest, orderSuccess} from "../actions/CheckDetail";

const initialState = {
    number: null,
    orderRequest: false,
    orderFailed: false
};

describe('CheckDetail reducer', () => {

    it('should return initial state', function () {
        expect(checkDetailReducer(undefined, {})).toEqual(initialState);
    });

    it('should get request', function () {
        expect(checkDetailReducer(initialState, {
            type: orderRequest.type
        })).toEqual({
            ...initialState,
            orderRequest: true
        });
    });

    it('should return order number', function () {
        const expectNumber = 15354;

        expect(checkDetailReducer(initialState, {
            type: orderSuccess.type,
            payload: expectNumber
        })).toEqual({
            ...initialState,
            number: expectNumber
        });
    });

    it('should return failde request', function () {
        expect(checkDetailReducer(initialState, {
            type: orderFailed.type
        })).toEqual({
            ...initialState,
            orderFailed: true
        });
    });
});