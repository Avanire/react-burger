import {orderDetailReducer} from './OrderDetail';
import {addOrderModal, removeOrderModal} from "../actions/OrderDetail";
import {data} from "../../utils/data-test";

const initialState = {
    modalOrder: null
}

const feedOrders = {
    _id: '123',
    ingredients: data,
    status: 'done',
    number: '123444',
    createdAt: '10.10.1992',
    name: 'name'
}

describe('Order Detail reducer', () => {
    it('should return initial state', function () {
        expect(orderDetailReducer(undefined, {})).toEqual(initialState);
    });

    it('should add order in modal', function () {
        expect(orderDetailReducer(initialState, {
            type: addOrderModal.type,
            payload: feedOrders
        })).toEqual({
            modalOrder: feedOrders
        });
    });

    it('should be empty modal', function () {
        expect(orderDetailReducer({modalOrder: feedOrders}, {
            type: removeOrderModal.type
        })).toEqual(initialState);
    });
})