const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const Bluebird = require('bluebird');
const ffmpeg = require('fluent-ffmpeg');
const AWS = require('aws-sdk');

require('dotenv').config();

const VIDEO_OUTPUT_PATH = '/tmp/output.mp4';
const BG_IMAGE_PATH = '/tmp/bg.jpg';
const FG_VIDEO_PATH = '/tmp/fg.mov';

const s3 = new AWS.S3();

process.env.FFMPEG_PATH = path.join(__dirname, 'bin', 'ffmpeg');
process.env.FFPROBE_PATH = path.join(__dirname, 'bin', 'ffprobe');
process.env.PATH += `:${process.env.LAMBDA_TASK_ROOT}`;

/**
 * Downloads a file and writes it to a file path
 * @param {String} s3Path S3 path to fetch
 * @param {String} filePath Local file path to write download to
 * @returns {Promise} Promise that resolves on write, rejects on all errors
 */
function downloadS3File(s3Path, filePath) {
    console.info(`downloading ${s3Path}`);
    return new Bluebird((resolve, reject) => {
        const stream = s3.getObject({ Bucket: process.env.AWS_BUCKET, Key: s3Path }).createReadStream();
        stream.on('error', err => reject(err));
        stream.on('end', () => {
            console.info(`finished downloading ${s3Path} to ${filePath}`);
            resolve(filePath);
        });
        stream.pipe(fs.createWriteStream(filePath));
    });
}

/**
 * Download file from an arbitrary URL and write it to a local file path
 * @param {string} fileUrl URL of the file to be downloaded
 * @param {string} filePath local file path to write downloaded file to
 * @returns {Promise<string>} Promise that resolves on completion, or rejects
 * on error
 */
function downloadUrlFile(fileUrl, filePath) {
    console.info(`downloading ${fileUrl} to ${filePath}`);

    return new Bluebird((resolve, reject) => {
        const parsedUrl = url.parse(fileUrl);
        const httpOptions = {
            hostname: parsedUrl.hostname,
            port: 80,
            path: parsedUrl.path,
            method: 'GET',
            headers: {
                Referer: `https://s3.amazonaws.com/${process.env.AWS_BUCKET}/front-end/index.html`,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
            },
        };

        http.get(httpOptions, res => {
            res.on('error', resErr => reject(resErr));
            res.on('end', () => {
                console.info(`finished downloading ${fileUrl} to ${filePath}`);
                resolve(filePath);
            });

            res.pipe(fs.createWriteStream(filePath));
        }).on('error', err => reject(err));
    });
}

/**
 * Downloads an array of files from S3
 * @param {string[]} audioFiles a list of S3 paths
 * @returns {Promise} Promise that resolves to a list of local paths
 */
function downloadAudioFiles(audioFiles) {
    console.log('downloading files', audioFiles);
    const fileMap = {
        ownerType: '/tmp/1.wav',
        houseType: '/tmp/2.wav',
        ownOrRent: '/tmp/3.wav',
        partyFavor: '/tmp/4.wav',
        congratsLevel: '/tmp/5.wav',
        giftType: '/tmp/6.wav',
        excitementLevel: '/tmp/7.wav',
    };

    Object.keys(audioFiles)
        .forEach(key => console.log(audioFiles[key], fileMap[key]));

    return Bluebird.all(
        Object.keys(audioFiles)
            .map(key => downloadS3File(audioFiles[key], fileMap[key])));
}

/**
 * Get metadata about a media file
 * @param {String} filePath Path to file to inspect
 * @returns {Promise<Object>} Metadata object from ffprobe
 */
function metadata(filePath) {
    return Bluebird.fromCallback(cb => ffmpeg.ffprobe(filePath, cb));
}

/**
 * Green-screen foreground video onto background image
 * @param {string} bgImageUrl URL to background image
 * @param {string} fgVideoUrl URL to foreground video
 * @param {object} audioFiles List of audio files on S3
 * @param {function} callback Callback on write completion
 * @returns {void}
 */
exports.greenScreen = function greenScreen(bgImageUrl, fgVideoUrl, audioFiles, callback) {
    Bluebird.all([
        downloadUrlFile(bgImageUrl.replace('550x300', '640x360'), BG_IMAGE_PATH),
        downloadS3File(fgVideoUrl, FG_VIDEO_PATH),
        downloadAudioFiles(audioFiles),
    ])

        .tap(() => console.info(`fetching metadata for ${BG_IMAGE_PATH} and ${FG_VIDEO_PATH}`))
        .then(() => Bluebird.all([metadata(BG_IMAGE_PATH), metadata(FG_VIDEO_PATH)]))
        .tap(() => console.info(`metadata fetched for ${BG_IMAGE_PATH} and ${FG_VIDEO_PATH}`))

        .then(results => {
            const bgMeta = results[0].streams[0];
            const fgMeta = results[1].streams[0];

            // calculate background image resize dimensions
            const bgWidth = fgMeta.width;
            const bgRatio = fgMeta.width / bgMeta.width;
            const bgHeight = Math.floor(bgMeta.height * bgRatio);

            ffmpeg()
                .input(BG_IMAGE_PATH).inputOptions('-loop 1')
                .input(FG_VIDEO_PATH)
                .input('/tmp/1.wav')
                .input('/tmp/2.wav')
                .input('/tmp/3.wav')
                .input('/tmp/4.wav')
                .input('/tmp/5.wav')
                .input('/tmp/6.wav')
                .input('/tmp/7.wav')
                .complexFilter([
                    // pad audio channels to line them up to the right spots
                    '[2:a]adelay=1800[a1]',
                    '[3:a]adelay=6000[a2]',
                    '[4:a]adelay=14400[a3]',
                    '[5:a]adelay=31000[a4]',
                    '[6:a]adelay=34800[a5]',
                    '[7:a]adelay=44000[a6]',
                    '[8:a]adelay=49500[a7]',

                    // resize bg image to fit behind fg video
                    {
                        filter: 'scale',
                        options: {
                            w: bgWidth,
                            h: bgHeight,
                        },
                        inputs: '0:v',
                        outputs: 'bgimg',
                    },

                    // crop image to maintain aspect ratio
                    {
                        filter: 'crop',
                        options: {
                            w: fgMeta.width,
                            h: fgMeta.height,
                            x: 0,
                            y: Math.floor(Math.abs(bgHeight - fgMeta.height) / 2),
                        },
                        inputs: 'bgimg',
                        outputs: 'bgimg2',
                    },

                    // convert black pixels to alpha
                    {
                        filter: 'colorkey',
                        options: {
                            color: '0x3AF641',
                            similarity: '0.4',
                            blend: '0.2',
                        },
                        inputs: '1:v',
                        outputs: 'ckout',
                    },

                    // overlay alpha video onto image background
                    {
                        filter: 'overlay',
                        inputs: ['bgimg2', 'ckout'],
                        outputs: 'video',
                    },

                    // mix all audio channels down to one
                    {
                        filter: 'amix',
                        options: {
                            inputs: 8,
                            duration: 'first',
                        },
                        inputs: ['1:a', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'],
                        outputs: 'audio',
                    },
                ], ['video', 'audio'])
                .outputOptions(`-t ${fgMeta.duration}`)
                .on('error', (err, stdout, stderr) => callback(`${err}\n\n${stdout}\n\n${stderr}`))
                .on('end', () => callback(null, { output: VIDEO_OUTPUT_PATH }))
                .save(VIDEO_OUTPUT_PATH);
        });
};
