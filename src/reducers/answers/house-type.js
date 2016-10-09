import actionTypes from '../../actions/types';

export default function (state = null, action) {
    if (action.type === actionTypes.SELECT_HOUSE_TYPE) {
        return action.payload.houseType;
    }
    return state;
}
