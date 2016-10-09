import actionTypes from '../actions/types';

export default function showStreetviewPreview(state = false, action) {
    switch (action.type) {
        case actionTypes.SHOW_STREETVIEW_PREVIEW:
            return true;
        case actionTypes.CHOOSE_ADDRESS:
        case actionTypes.NEXT_STEP:
            return false;
        default:
            return state;
    }
}
