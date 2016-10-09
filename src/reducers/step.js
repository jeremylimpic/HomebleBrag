import actionTypes from '../actions/types';

export default function step (state = 0, action) {
    switch (action.type) {
        case actionTypes.NEXT_STEP:
            return state + 1;
        case actionTypes.PREVIOUS_STEP:
            return state - 1;
        case actionTypes.LOAD_STEP:
            return action.payload;
        default:
            return state;
    }
}
