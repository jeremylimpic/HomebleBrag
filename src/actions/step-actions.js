import actionTypes from './types';

export function nextStep() {
    return {
        type: actionTypes.NEXT_STEP,
    };
}

export function prevStep() {
    return {
        type: actionTypes.PREVIOUS_STEP,
    };
}

export function loadStep(index) {
    return {
        type: actionTypes.LOAD_STEP,
        payload: index,
    };
}

export function showStreetviewPreview() {
    return {
        type: actionTypes.SHOW_STREETVIEW_PREVIEW,
    };
}
