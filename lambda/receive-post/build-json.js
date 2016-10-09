'use strict';

const Bluebird = require('bluebird');
const AWS = require('aws-sdk');
const s3Stream = require('s3-upload-stream')(new AWS.S3());
const Readable = require('stream').Readable;

require('dotenv').config();

module.exports = function buildJSON(uuid) {
    const destination = `${uuid}/status.json`;
    const data = JSON.stringify({ status: 'loading' });

    const uploadStream = s3Stream.upload({
        Bucket: process.env.AWS_BUCKET,
        Key: destination,
        ContentType: 'application/json',
    });
    uploadStream.concurrentParts(5);

    return new Bluebird((resolve, reject) => {
        uploadStream.on('uploaded', () => resolve(destination));
        uploadStream.on('error', err => reject(err));

        // upload html to S3
        const stringStream = new Readable();
        stringStream._read = () => undefined;
        stringStream.push(data);
        stringStream.push(null);
        stringStream.pipe(uploadStream);
    });
};
