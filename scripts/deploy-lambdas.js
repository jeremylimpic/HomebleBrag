const s3 = require('s3');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const Bluebird = require('bluebird');

// load environment variables from .env file
require('dotenv').config();

function cloneEnvVars() {
    const envVars = [
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY',
        'AWS_BUCKET',
        'LAMBDA_BUILDVIDEO',
        'LAMBDA_SUBMISSION',
        'LAMBDA_BUILDIMAGE',
        'LAMBDA_ADDRESS',
        'LAMBDA_SHARE_EMAIL',
        'API_GW_ADDRESS',
    ];

    const contents = envVars.map(varName => (
        `${varName}=${process.env[varName]}`
    )).join('\n');

    const dirs = [
        path.join('lambda', 'video-builder'),
        path.join('lambda', 'receive-post'),
        path.join('lambda', 'build-image'),
        path.join('lambda', 'validate-address'),
        path.join('lambda', 'share-email'),
    ];

    dirs.forEach(dir => {
        fs.writeFileSync(path.join(dir, '.env'), contents, 'utf8');
    });
}

// configure S3
const client = s3.createClient({
    multipartUploadThreshold: 41943040,
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

function uploadFile(filePath) {
    return new Bluebird((resolve, reject) => {
        process.stdout.write(`uploading ${filePath}\n`);

        const uploader = client.uploadFile({
            localFile: filePath,
            s3Params: {
                Bucket: process.env.AWS_BUCKET,
                Key: path.parse(filePath).base,
            },
        });

        uploader.on('error', err => reject(err));
        uploader.on('end', () => {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`uploaded ${filePath}\n`);
            resolve();
        });
    });
}

const lambda = new AWS.Lambda({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
});

function updateLambda(functionName, fileKey) {
    process.stdout.write(`Updating lambda ${functionName}\n`);
    return new Bluebird((resolve, reject) => {
        lambda.updateFunctionCode({
            FunctionName: functionName,
            S3Bucket: process.env.AWS_BUCKET,
            S3Key: fileKey,
        }, (err, data) => {
            if (err) {
                return reject(err);
            }
            process.stdout.write(`Lambda ${functionName} updated\n`);
            return resolve(data);
        });
    });
}

cloneEnvVars();

const uploads = [
    uploadFile(path.join('lambda', 'video-builder', 'buildVideo.zip')),
    uploadFile(path.join('lambda', 'receive-post', 'receivePost.zip')),
    uploadFile(path.join('lambda', 'build-image', 'buildImage.zip')),
    uploadFile(path.join('lambda', 'validate-address', 'validateAddress.zip')),
    uploadFile(path.join('lambda', 'share-email', 'shareEmail.zip')),
    uploadFile(path.join('media', 'background.mov')),
];

Bluebird.all(uploads)
    .then(() => Bluebird.all([
        updateLambda(process.env.LAMBDA_BUILDVIDEO, 'buildVideo.zip'),
        updateLambda(process.env.LAMBDA_SUBMISSION, 'receivePost.zip'),
        updateLambda(process.env.LAMBDA_BUILDIMAGE, 'buildImage.zip'),
        updateLambda(process.env.LAMBDA_ADDRESS, 'validateAddress.zip'),
        updateLambda(process.env.LAMBDA_SHARE_EMAIL, 'shareEmail.zip'),
    ]))
    .catch(err => console.error('Error: ', err));
