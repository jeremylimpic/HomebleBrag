import actionTypes from '../../actions/types';

let autocompleteSvc;
let placesSvc;
let scope;
try {
    scope = window;
    scope = global;
} catch (e) {
    scope = {};
}
scope.initMaps = () => {
    autocompleteSvc = new google.maps.places.AutocompleteService();
    placesSvc = new google.maps.places.PlacesService(document.getElementById('map'));
};

const googleMapSearch = () => next => action => {
    next(action);

    if (action.type === actionTypes.SET_ADDRESS && action.payload.address.length > 0) {
        // get autocomplete predictions
        autocompleteSvc.getPlacePredictions({ input: action.payload.address }, (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                next({
                    type: actionTypes.RECEIVE_ADDRESS_PREDICTIONS,
                    payload: {
                        predictions: predictions.map(prediction => prediction.description),
                    },
                });

                // get place details for top autocomplete result, to generate
                // street view image
                placesSvc.getDetails({ placeId: predictions[0].place_id }, (place, status2) => {
                    if (status2 === google.maps.places.PlacesServiceStatus.OK && place) {
                        next({
                            type: actionTypes.RECEIVE_PLACE_PREDICTION,
                            payload: place,
                        });
                    }
                });
            }
        });
    }
};

export default googleMapSearch;
