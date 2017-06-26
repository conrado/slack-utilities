var WebClient = require('@slack/client').WebClient;
var _ = require('lodash');

var token = process.env.SLACK_BOT_TOKEN || ''; //see section above on sensitive data

var web = new WebClient(token);
web.chat.postMessage('C1232456', 'Hello there', function(err, res) {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Message sent: ', res);
  }
});
