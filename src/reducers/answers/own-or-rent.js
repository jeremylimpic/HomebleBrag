import actionTypes from '../../actions/types';

export default function (state = null, action) {
    if (action.type === actionTypes.SELECT_OWN_OR_RENT) {
        return action.payload.ownOrRent;
    }
    return state;
}
