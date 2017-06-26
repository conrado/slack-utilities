var WebClient = require('@slack/client').WebClient;
var _ = require('lodash');

var token = process.env.SLACK_BOT_TOKEN || '';
var web = new WebClient(token);

var CHANNELS_TO_LEAVE = _.range(1228, 1275)

function get_number(channel_name) {
  var splitted = channel_name.split('im-');
  if(splitted.length == 2)
    return parseInt(splitted[1]);
  else
    return -1;
}

web.channels.list(function(err, info) {
  if (err) {
    console.log('Error: ', err);
  } else {
    for(var i in info.channels) {
      var channel_number = get_number(info.channels[i].name)
      if (CHANNELS_TO_LEAVE.includes(channel_number)
          && info.channels[i].is_member) {
        web.channels.leave(info.channels[i].id)
        console.log('Left: ', info.channels[i].name)
      }
    }
  }
})
