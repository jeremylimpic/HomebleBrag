const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = (event, context) => {
    console.info('share email', JSON.stringify(event));

    const message = `Your friend ${event.yourName} had Elizabeth Banks brag about their new house!

Check it out here: https://s3.amazonaws.com/805-video/${event.uuid}/index.html`;

    const params = {
        Source: 'josh@joshmock.com',
        Destination: { ToAddresses: [event.friendEmail] },
        Message: {
            Body: { Text: { Data: message } },
            Subject: { Data: `Your friend ${event.yourName} wants to #homeblebrag` },
        },
    };

    console.log(`sending email to ${event.friendEmail}`);
    ses.sendEmail(params, err => {
        if (err) {
            console.error(err);
        } else {
            console.log(`sent email to ${event.friendEmail}`);
            context.succeed(event);
        }
    });
};
