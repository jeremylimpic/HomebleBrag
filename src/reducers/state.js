import actionTypes from '../actions/types';

const findState = place => (
    place.address_components
        .filter(component => component.types.indexOf('administrative_area_level_1') > -1)[0]
        .short_name);

export default function (state = null, action) {
    switch (action.type) {
        case actionTypes.RECEIVE_PLACE_PREDICTION:
            return findState(action.payload);
        default:
            return state;
    }
}
