import actionTypes from '../actions/types';

const findCity = place => (
    place.address_components
        .filter(component => component.types.indexOf('locality') > -1)[0]
        .long_name);

export default function (state = null, action) {
    switch (action.type) {
        case actionTypes.RECEIVE_PLACE_PREDICTION:
            return findCity(action.payload);
        default:
            return state;
    }
}
