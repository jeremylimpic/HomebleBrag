const fetchMiddleware = store => next => action => {
    next(action);

    if (action.meta && action.meta.fetch) {
        const fetchData = action.meta.fetch;
        const promise = fetch(fetchData.url, fetchData.settings || {})
                            .then(response => response.json());

        if (fetchData.actions) {
            if (fetchData.actions.success) {
                promise.then(json => store.dispatch({
                    type: fetchData.actions.success,
                    payload: {
                        fetchAction: action,
                        response: json,
                    },
                }));
            }

            if (fetchData.actions.error) {
                promise.catch(error => store.dispatch({
                    type: fetchData.actions.error,
                    payload: error,
                }));
            }
        }
    }
};

export default fetchMiddleware;
