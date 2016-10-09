import actionTypes from '../actions/types';

export default function (state = 0, action) {
    switch (action.type) {
        case actionTypes.AUTOFILL_SELECT_NEXT:
            return state + 1;
        case actionTypes.AUTOFILL_SELECT_PREV:
            return state - 1;
        case actionTypes.SET_ADDRESS:
            return 0;
        default:
            return state;
    }
}
