import actionTypes from '../../actions/types';

export default function (state = null, action) {
    if (action.type === actionTypes.SELECT_CONGRATS_LEVEL) {
        return action.payload.congratsLevel;
    }
    return state;
}
