import actionTypes from '../../actions/types';

const WAIT = 4000;

const pollMiddleware = store => next => action => {
    next(action);

    if (action.type === actionTypes.SUBMIT_FORM_SUCCESS) {
        let inProgress = false;
        const { uuid } = action.payload.response;
        const statusUrl = `https://s3.amazonaws.com/${process.env.AWS_BUCKET}/${uuid}/status.json`;
        const interval = setInterval(() => {
            if (!inProgress) {
                inProgress = true;

                fetch(statusUrl, { mode: 'cors' })
                    .then(response => response.json())
                    .then(data => {
                        inProgress = false;

                        if (data.status === 'done') {
                            clearInterval(interval);
                            store.dispatch({
                                type: actionTypes.VIDEO_READY,
                                payload: { uuid },
                            });
                        }
                    })
                    .catch(err => console.log(err));
            }
        }, WAIT);
    }
};

export default pollMiddleware;
