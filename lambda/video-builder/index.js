'use strict';

const fs = require('fs');
const path = require('path');
const Bluebird = require('bluebird');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const s3Stream = require('s3-upload-stream')(s3);
const mime = require('mime');
const tmpl = require('lodash.template');
const buildVideo = require('./build-video');
const getAudioFiles = require('./audio');

require('dotenv').config();

const AWS_BUCKET = process.env.AWS_BUCKET;
const VIDEO_OUTPUT_PATH = '/tmp/output.mp4';
const JSON_PATH = path.join(__dirname, 'done.json');
const TEMPLATE_PATH = path.join(__dirname, 'template.ejs');
const HTML_PATH = '/tmp/index.html';
const PLAYER_TEMPLATE_PATH = path.join(__dirname, 'player.ejs');
const PLAYER_PATH = '/tmp/player.html';

/**
 * Upload a local file to S3
 * @param {String} filePath Path to local file
 * @param {String} destination Path to upload file to on S3
 * @returns {Promise} Promise that resolves on completion, rejects on error
 */
function uploadPathToS3(filePath, destination) {
    // S3 write stream
    console.info(`uploading ${filePath} to ${destination}`);
    const uploadStream = s3Stream.upload({
        Bucket: AWS_BUCKET,
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

function uploadStyles(uuid) {
    const dist = path.join(__dirname, 'dist');
    return Bluebird.all(fs.readdirSync(dist).map(file => {
        const fileName = path.parse(file).base;
        return uploadPathToS3(path.join(dist, file), `${uuid}/${fileName}`);
    }));
}

function generatePageHTML(uuid, streetViewImg) {
    const contents = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    const template = tmpl(contents);
    const data = {
        url: `https://s3.amazonaws.com/${AWS_BUCKET}/${uuid}/index.html`,
        previewImage: `https://s3.amazonaws.com/${AWS_BUCKET}/${uuid}/preview.png`,
        videoUrl: `https://s3.amazonaws.com/${AWS_BUCKET}/${uuid}/output.mp4`,
        playerUrl: `https://s3.amazonaws.com/${AWS_BUCKET}/${uuid}/player.html`,
        bucket: AWS_BUCKET,
        uuid,
        streetViewImg,
    };
    fs.writeFileSync(HTML_PATH, template(data));
}

function generatePlayerHTML(streetViewImg) {
    const contents = fs.readFileSync(PLAYER_TEMPLATE_PATH, 'utf8');
    const template = tmpl(contents);
    const data = { streetViewImg };
    fs.writeFileSync(PLAYER_PATH, template(data));
}

exports.handler = (event, context, callback) => {
    const fgVid = 'background.mov';
    const audioFiles = getAudioFiles(event);

    try {
        console.info(`generating video for event ${event.uuid}`);
        buildVideo.greenScreen(event.imageUrl, fgVid, audioFiles, err => {
            if (err) {
                callback(err);
            } else {
                console.info(`video generated for event ${event.uuid}`);

                generatePageHTML(event.uuid, event.imageUrl);
                generatePlayerHTML(event.imageUrl);

                const videoOut = VIDEO_OUTPUT_PATH.replace('/tmp', `${event.uuid}`);
                Bluebird.all([
                    uploadPathToS3(VIDEO_OUTPUT_PATH, videoOut),
                    uploadPathToS3(JSON_PATH, `${event.uuid}/status.json`),
                    uploadPathToS3(HTML_PATH, `${event.uuid}/index.html`),
                    uploadPathToS3(PLAYER_PATH, `${event.uuid}/player.html`),
                    uploadStyles(event.uuid),
                ])
                .then(() => callback(null, videoOut))
                .catch(err2 => callback(err2));
            }
        });
    } catch (e) {
        callback(e);
    }
};
