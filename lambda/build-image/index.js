const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const Bluebird = require('bluebird');
const AWS = require('aws-sdk');
const mime = require('mime');
const s3 = new AWS.S3();
const s3Stream = require('s3-upload-stream')(s3);

require('dotenv').config();

process.env.FFMPEG_PATH = path.join(__dirname, 'bin', 'ffmpeg');
process.env.FFPROBE_PATH = path.join(__dirname, 'bin', 'ffprobe');
process.env.PATH += `:${process.env.LAMBDA_TASK_ROOT}`;

function uploadPathToS3(filePath, destination) {
    // S3 write stream
    console.info(`uploading ${filePath} to ${destination}`);
    const uploadStream = s3Stream.upload({
        Bucket: process.env.AWS_BUCKET,
        Key: destination,
        ContentType: mime.lookup(filePath),
    });
    uploadStream.concurrentParts(5);

    return new Bluebird((resolve, reject) => {
        uploadStream.on('uploaded', () => {
            console.info(`finished: ${destination}`);
            resolve(destination);
        });
        uploadStream.on('error', err => reject(err));

        // upload temp file
        fs.createReadStream(filePath).pipe(uploadStream);
    });
}

function doText(cityName, stateName) {
    const cityLeft = 460;
    const stateLeft = ((cityName.length) * 50) + cityLeft + 15;

    return new Bluebird((resolve, reject) => {
        ffmpeg()
            .input(path.join(__dirname, 'share-image.png'))
            .complexFilter([
                {
                    filter: 'drawtext',
                    options: {
                        fontfile: path.join(__dirname, 'HalisR-Bold.ttf'),
                        text: cityName.toUpperCase(),
                        fontcolor: 'e40114',
                        fontsize: 62,
                        x: 460,
                        y: 208,
                    },
                    outputs: 'output1',
                },
                {
                    filter: 'drawtext',
                    options: {
                        fontfile: path.join(__dirname, 'HalisR-Bold.ttf'),
                        text: stateName.toUpperCase(),
                        fontcolor: '000000',
                        fontsize: 62,
                        x: stateLeft,
                        y: 208,
                    },
                    inputs: 'output1',
                    outputs: 'output2',
                },
            ], 'output2')
            .audioCodec('copy')
            .output('/tmp/output.png')
            .on('stderr', err => console.error(err))
            .on('error', (err, stdout, stderr) => {
                console.error(err, stdout, stderr);
                reject(err);
            })
            .on('end', () => resolve())
            .run();
    });
}

exports.handler = (event, context, callback) => {
    console.info('building preview image', event.uuid, event.city, event.state);
    doText(event.city, event.state)
        .then(() => uploadPathToS3('/tmp/output.png', `${event.uuid}/preview.png`))
        .then(() => callback(null, 'success'), err => callback(err))
        .catch(err => callback(err));
};
