import actionTypes from './types';

export function sendEmail(params) {
    return {
        type: actionTypes.SEND_EMAIL,
        payload: params,
        meta: {
            fetch: {
                url: `${process.env.API_GW_ADDRESS}/send-email`,
                settings: {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    body: JSON.stringify(params),
                },
            },
        },
    };
}
