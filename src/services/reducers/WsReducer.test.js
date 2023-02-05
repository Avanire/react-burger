import {wsReducer} from './WsReducer';
import {onClose, onError, onMessage, onOpen} from "../actions/WsActions";

const initialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
}

describe('ws reducer', () => {
    it('should be initial state', function () {
        expect(wsReducer(undefined, {})).toEqual(initialState);
    });

    it('should open ws', function () {
        expect(wsReducer(initialState, {
            type: onOpen.type
        })).toEqual({
            ...initialState,
            wsConnected: true
        });
    });

    it('should closed ws and get error', function () {
        expect(wsReducer({
            ...initialState,
            wsConnected: true
        }, {
            type: onError.type,
            payload: 'error'
        })).toEqual({
            ...initialState,
            wsConnected: false,
            error: 'error'
        });
    });

    it('should closed ws', function () {
        expect(wsReducer({
            ...initialState,
            wsConnected: true
        }, {
            type: onClose.type,
            payload: 'error'
        })).toEqual({
            ...initialState,
            wsConnected: false,
            error: 'error'
        });
    });

    it('should get message', function () {
        const payload = {
            orders: {},
            total: 1000,
            totalToday: 10
        }

        expect(wsReducer(initialState, {
            type: onMessage.type,
            payload: payload
        })).toEqual({
            ...initialState,
            orders: [payload.orders],
            total: payload.total,
            totalToday: payload.totalToday
        });
    });
});