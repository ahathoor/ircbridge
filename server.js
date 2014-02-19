'use strict';

var irc = require('irc');
var express = require('express');
var syncList = require('./static/syncList.js').create();

// var PushBullet = require('pushbullet');
// var pusher = new PushBullet('OVljgEN2Nep9PlQDYDW2K5OirKViNu93');
// pusher.devices(function (error, response) {
//                   console.log(response);
// });
// pusher.note(5741031244955648, 'New Note', 'Note body text', function(error, response) {});


var app = express();
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.get('/', function(req,res) {
  res.redirect('/static/index.html');
});

//**
//* Handle the requests from the clients.
app.post('/', function(req,res) {
  var data = req.body;
  if(data.request == 'fetch new') {
    res.json(syncList.elementsAfter(data.latest));
  }
});

app.listen(3001);

setInterval( function() {
  syncList.add({
   date: new Date().toJSON,
   server: 'irc.under.web',
   type: 'message',
   who: 'theBuddha',
   where: '#aum',
   payload: 'I love you'});
},1000);

var client = new irc.Client('irc.freenode.net', 'mothibotti', {
  channels: ['#testisbest'],
});

client.addListener('message',function(from, to, message) {
  syncList.add({
   date: new Date().toJSON,
   server: client.opt.server,
   who: from,
   where: to,
   payload: message});
});
