import actionTypes from './types';
import _ from 'lodash';
import uuid from 'uuid-v4';
import { buildImageUrl } from '../utils/map-image';

export function setAddress(address) {
    return {
        type: actionTypes.SET_ADDRESS,
        payload: { address },
    };
}

export function setAddressAutocompleteNext() {
    return {
        type: actionTypes.AUTOFILL_SELECT_NEXT,
    };
}

export function setAddressAutocompletePrev() {
    return {
        type: actionTypes.AUTOFILL_SELECT_PREV,
    };
}

export function validateAddress(address) { // eslint-disable-line
    return {
        type: actionTypes.VALIDATE_ADDRESS_SUCCESS,
        payload: { response: true },
    };
    /*
    const payload = { address };
    return {
        type: actionTypes.VALIDATE_ADDRESS,
        payload,
        meta: {
            fetch: {
                url: `${process.env.API_GW_ADDRESS}/validate-address`,
                settings: {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    body: JSON.stringify(payload),
                },
                actions: {
                    success: actionTypes.VALIDATE_ADDRESS_SUCCESS,
                    error: actionTypes.VALIDATE_ADDRESS_ERROR,
                },
            },
        },
    };
    */
}

export function submitForm(formData) {
    const payload = _.extend({}, formData.answers, {
        address: formData.address,
        city: formData.city,
        state: formData.state,
    });

    payload.uuid = uuid();
    payload.imageUrl = `http:${buildImageUrl(formData.address)}`;

    return {
        type: actionTypes.SUBMIT_FORM,
        payload,
        meta: {
            fetch: {
                url: 'https://o92w4nydwl.execute-api.us-east-1.amazonaws.com/test/video',
                settings: {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    body: JSON.stringify(payload),
                },
                actions: {
                    success: actionTypes.SUBMIT_FORM_SUCCESS,
                    error: actionTypes.SUBMIT_FORM_ERROR,
                },
            },
        },
    };
}

export function selectOwnerType(ownerType) {
    return {
        type: actionTypes.SELECT_OWNER_TYPE,
        payload: { ownerType },
    };
}

export function selectHouseType(houseType) {
    return {
        type: actionTypes.SELECT_HOUSE_TYPE,
        payload: { houseType },
    };
}

export function selectOwnOrRent(ownOrRent) {
    return {
        type: actionTypes.SELECT_OWN_OR_RENT,
        payload: { ownOrRent },
    };
}

export function selectPartyFavor(partyFavor) {
    return {
        type: actionTypes.SELECT_PARTY_FAVOR,
        payload: { partyFavor },
    };
}

export function selectExcitementLevel(excitementLevel) {
    return {
        type: actionTypes.SELECT_EXCITEMENT_LEVEL,
        payload: { excitementLevel },
    };
}

export function selectGiftType(giftType) {
    return {
        type: actionTypes.SELECT_GIFT_TYPE,
        payload: { giftType },
    };
}

export function selectCongratsLevel(congratsLevel) {
    return {
        type: actionTypes.SELECT_CONGRATS_LEVEL,
        payload: { congratsLevel },
    };
}

export function chooseAddress() {
    return {
        type: actionTypes.CHOOSE_ADDRESS,
    };
}
