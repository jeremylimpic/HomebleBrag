import actionTypes from '../../actions/types';

export default function (state = null, action) {
    if (action.type === actionTypes.SELECT_OWNER_TYPE) {
        return action.payload.ownerType;
    }
    return state;
}
