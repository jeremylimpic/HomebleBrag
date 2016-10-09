const s3 = require('s3');
const path = require('path');

// load environment variables from .env file
require('dotenv').config();

// configure S3
const client = s3.createClient({
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// sync dist/ directory to bucket
const uploader = client.uploadDir({
    localDir: path.join('dist'),
    s3Params: {
        Bucket: process.env.AWS_BUCKET,
        Prefix: 'front-end/',
    },
});

uploader.on('error', err => console.log(err.stack));
uploader.on('progress', () => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const amt = uploader.progressAmount;
    const total = uploader.progressTotal;
    const percentage = amt/total * 100;
    process.stdout.write(`progress: ${percentage.toFixed(2)}% (${amt}/${total})`);
});
uploader.on('end', () => console.log("\ndone uploading"));
