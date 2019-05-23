require('dotenv').config()

const AWS = require('aws-sdk');
const SES = new AWS.SES();

function sendEmail(formData, callback) {
  const emailParams = {
    Source: process.env.FROM,
    Destination: {
      ToAddresses: [process.env.TO],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<b>Howdy!</b><br/><br/>

A new human subscribed on your coming soon page.<br/>
Don't forget to send an email when the website is finished.<br/><br/>

<b><a href="mailto:${formData.email}">${formData.email}</a></b><br/><br/>

The website where this email came from:<br/>
<a href="${formData.website}" target="_blank">${formData.website}</a><br/><br/>

Sincerely,<br/>
Your friends at Chess Coders<br/>`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'New message from your Coming soon page',
      },
    },
  };

  SES.sendEmail(emailParams, callback);
}

module.exports.mailer = (event, context, callback) => {
  const formData = JSON.parse(event.body);

  sendEmail(formData, function(err, data) {
    const response = {
      statusCode: err ? 500 : 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: err ? err.message : data,
      }),
    };

    callback(null, response);
  });
};
