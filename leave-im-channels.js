#!/usr/bin/env node

var commander = require('commander')
var SlackWebClient = require('@slack/client').WebClient
var _ = require('lodash')

var token = process.env.SLACK_BOT_TOKEN || ''
var slackweb = new SlackWebClient(token)

function get_number(channel_name) {
  var splitted = channel_name.split('im-')
  if(splitted.length == 2)
    return parseInt(splitted[1])
  else
    return -1
}

function leave_channels(CHANNELS_TO_LEAVE) {
  slackweb.channels.list(function(err, info) { if (err) {
      console.log('Error: ', err)
    } else {
      for(var i in info.channels) {
        var channel_number = get_number(info.channels[i].name)
        if (CHANNELS_TO_LEAVE.includes(channel_number)
            && info.channels[i].is_member) {
          slackweb.channels.leave(info.channels[i].id)
          console.log('Left: ', info.channels[i].name)
        }
      }
    }
  })
}

commander
  .usage('-f <from> -t <to>')
  .option('-f, --from <n>', 'From channel (inclusive)')
  .option('-t, --to <n>', 'To channel (exclusive)')
  .version('0.0.2', '-v, --version')
  .parse(process.argv)

if(typeof commander.from === 'undefined' && typeof commander.to === 'undefined') {
  commander.outputHelp()
  process.exit(1)
}

var CHANNELS_TO_LEAVE = _.range(commander.from, commander.to)

leave_channels(CHANNELS_TO_LEAVE)
