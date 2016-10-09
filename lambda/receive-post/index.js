'use strict';

const Joi = require('joi');
const pick = require('lodash.pick');
const AWS = require('aws-sdk');
const Bluebird = require('bluebird');
const buildJSON = require('./build-json');

// schema for validating input
const schemaObj = {
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
    uuid: Joi.string().required(),
    ownerType: Joi.string().required().allow('person', 'couple', 'family'),
    houseType: Joi.string().required().allow('home', 'apartment', 'condo'),
    ownOrRent: Joi.string().required().allow('home-owner', 'home-renter', 'home-owners'),
    partyFavor: Joi.string().required().allow('drinks', 'food', 'conversation'),
    excitementLevel: Joi.number().integer().required().allow(1, 2, 3),
    giftType: Joi.string().required().allow('gift', 'another-gift', 'different-gift'),
    congratsLevel: Joi.number().integer().required().allow(1, 2, 3),
};
const schema = Joi.object().keys(schemaObj);

const lambda = new AWS.Lambda();
function invokeLambda(args) {
    return Bluebird.fromCallback(callback => {
        lambda.invoke(args, callback);
    });
}

exports.handler = (event, context, callback) => {
    // validate JSON input
    Joi.validate(event, schema, (err, value) => {
        if (err) {
            return callback(err);
        }

        // format data to pass on to video-builder
        const output = pick(value, Object.keys(schemaObj));
        const outputJSON = JSON.stringify(output);

        console.info('post received', outputJSON);

        // create preview page
        return buildJSON(output.uuid)
            .then(() => {
                // spin up buildVideo lambda as background process
                const args = {
                    FunctionName: 'buildVideo',
                    InvocationType: 'Event',
                    Payload: outputJSON,
                };
                return invokeLambda(args);
            })
            .then(() => {
                // spin up buildImage lambda as background process
                const args = {
                    FunctionName: 'buildImage',
                    InvocationType: 'Event',
                    Payload: outputJSON,
                };
                return invokeLambda(args);
            })
            .then(
                data => callback(null, {
                    success: true,
                    data,
                    uuid: output.uuid,
                }),
                callback)
            .catch(callback);
    });
};
