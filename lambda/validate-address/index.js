const request = require('request');
const querystring = require('querystring');

function addressToQuerystring(address) {
    const parts = address.split(',').map(part => part.trim());
    const params = {
        address: parts[0],
        city: parts[1],
        state_code: parts[2],
    };

    return querystring.stringify(params);
}

function validateAddress(address, callback) {
    const qs = addressToQuerystring(address);
    request.get(`http://api.move.com/v3/properties/search?${qs}`, (err, res, body) => {
        if (err) {
            return callback(err);
        }

        if (res.statusCode !== 200) {
            return callback(`HTTP error: ${res.statusCode} ${res.statusMessage}`);
        }

        return callback(null, JSON.parse(body).matching_rows > 0);
    });
}

exports.handler = (event, context, callback) => {
    validateAddress(event.address, callback);
};
