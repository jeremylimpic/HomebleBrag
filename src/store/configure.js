import { createStore, applyMiddleware, compose } from 'redux';
import googleMapSearch from './middleware/google-maps';
import fetchMiddleware from './middleware/fetch';
import pollMiddleware from './middleware/poll';
import rootReducer from '../reducers';

/**
 * Creates a store out of the root reducer
 * @returns {Object} Store instance
 */
export default function () {
    return createStore(
        rootReducer,
        {},
        compose(
            applyMiddleware(googleMapSearch, fetchMiddleware, pollMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : fn => fn
        )
    );
}
