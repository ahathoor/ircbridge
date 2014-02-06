'use strict';

var irc = require('irc');
var express = require('express');
var loki = require('./loki.js').create();

// var PushBullet = require('pushbullet');
// var pusher = new PushBullet('OVljgEN2Nep9PlQDYDW2K5OirKViNu93');
// pusher.devices(function (error, response) {
//                   console.log(response);
// });
// pusher.note(5741031244955648, 'New Note', 'Note body text', function(error, response) {});


var app = express();

app.get('/', function(req,res) {
  res.send(JSON.stringify(loki.getServers()));
});
app.get('/fetch', function(req,res) {
  res.send(req.query.server + ' ' + req.query.channel);
});

app.listen(3001);

loki.addMessage('servu', 'lähettäjä' ,'#testik', 'viesti');
var v = loki.getMessages('servu', '#testik');
console.log(v);




  var client = new irc.Client('irc.freenode.net', 'mothibotti', {
    channels: ['#testisbest'],
  });

  client.addListener('message',function(from, to, message) {
    loki.addMessage(client.opt.server, from, to, message);
    console.log(loki.getMessages(client.opt.server, to));
  });
