import actionTypes from '../actions/types';

export default function spinner(state = 'normal', action) {
    switch (action.type) {
        case actionTypes.SUBMIT_FORM:
            return 'spinner';
        default:
            return state;
    }
}
