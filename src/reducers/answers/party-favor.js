import actionTypes from '../../actions/types';

export default function (state = null, action) {
    if (action.type === actionTypes.SELECT_PARTY_FAVOR) {
        return action.payload.partyFavor;
    }
    return state;
}
