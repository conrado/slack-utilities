var WebClient = require('@slack/client').WebClient;

var token = process.env.SLACK_BOT_TOKEN || ''; //see section above on sensitive data

var web = new WebClient(token);
//web.chat.postMessage('C1232456', 'Hello there', function(err, res) {
  //if (err) {
    //console.log('Error:', err);
  //} else {
    //console.log('Message sent: ', res);
  //}
//});

web.channels.list(function(err, info) {
  if (err) {
    console.log('Error: ', err);
  } else {
    for(var i in info.channels) {
      console.log(info.channels[i].name)
    }
  }
})
