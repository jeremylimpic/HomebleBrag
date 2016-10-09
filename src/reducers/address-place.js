import actionTypes from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case actionTypes.RECEIVE_PLACE_PREDICTION:
            return action.payload;

        default:
            return state;
    }
}
