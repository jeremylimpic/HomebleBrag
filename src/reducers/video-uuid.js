import actionTypes from '../actions/types';

export default function videoUUID(state = null, action) {
    if (action.type === actionTypes.VIDEO_READY) {
        return action.payload.uuid;
    }
    return state;
}
