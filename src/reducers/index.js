import { combineReducers } from 'redux';
import address from './address';
import addressAutofill from './address-autofill';
import addressAutofillSelection from './address-autofill-selection';
import addressPlace from './address-place';
import city from './city';
import state from './state';
import step from './step';
import answers from './answers';
import showStreetviewPreview from './show-streetview-preview';
import spinner from './spinner';
import validAddress from './valid-address';
import videoUUID from './video-uuid';

export default combineReducers({
    address,
    addressAutofill,
    addressAutofillSelection,
    addressPlace,
    validAddress,
    city,
    state,
    step,
    answers,
    showStreetviewPreview,
    spinner,
    videoUUID,
});
