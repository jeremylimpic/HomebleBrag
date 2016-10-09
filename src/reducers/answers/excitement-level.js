import actionTypes from '../../actions/types';

export default function (state = null, action) {
    if (action.type === actionTypes.SELECT_EXCITEMENT_LEVEL) {
        return action.payload.excitementLevel;
    }
    return state;
}
