import actionTypes from '../../actions/types';

export default function (state = null, action) {
    if (action.type === actionTypes.SELECT_GIFT_TYPE) {
        return action.payload.giftType;
    }
    return state;
}
