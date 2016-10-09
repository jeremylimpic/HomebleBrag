import actionTypes from '../actions/types';

export default function validAddress(state = null, action) {
    if (action.type === actionTypes.VALIDATE_ADDRESS_SUCCESS) {
        return action.payload.response;
    }
    return state;
}
