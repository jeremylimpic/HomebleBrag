import actionTypes from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case actionTypes.RECEIVE_ADDRESS_PREDICTIONS:
            return action.payload.predictions;

        case actionTypes.SET_ADDRESS:
            if (action.payload.address.length === 0) {
                return [];
            } else {
                return state;
            }

        default:
            return state;
    }
}
