import actionTypes from '../actions/types';

export default (state = null, action) => {
    if (action.type === actionTypes.SET_ADDRESS) {
        return action.payload.address;
    }
    return state;
};
