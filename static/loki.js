'use strict';

var ircIndex = function(eventsIn) {
  var my = {};

  var servers = [];
  var channels = {};
  var chanEvents = {};

  var queriers = {}; // Contains a list of nick's that have queried you
  var queryEvents = {};

  var events = eventsIn;

  var addServer = function (server) {
    servers.push(server);  //list the server
    channels[server] = []; //make an entry in the channel list
    chanEvents[server] = {}; //A new object in the chanMessages object

    queriers[server] = [];
    queryEvents[server] = {};
  };

  var addChannel = function(server, channel) {
    channels[server].push(channel); //A new channel entry in the channels bookkeeping
    chanEvents[server][channel] = []; //A new list for chanMessages in the chanMessages object
  };

  var addQuerier = function(server, user) {
    queriers[server].push(user);
    queryEvents[server][user] = [];
  };

  var knowsServer = function(server) {
    return servers.indexOf(server) != -1;
  };

  var knowsChannel = function(server, channel) {
    return knowsServer(server) && channels[server].indexOf(channel) != -1;
  };

  var knowsQuerier = function(server, user) {
    return knowsServer(server) && queriers[server].indexOf(user) != -1;
  };

  var addEvent = function(index, data) {
    var server = data.server;
    var who = data.who;
    var where = data.where;

    if (!knowsServer(server)) addServer(server);
    if (where.indexOf('#') == -1 || where.indexOf('&') == -1) {
      if (!knowsChannel(where)) addChannel(server, where);
      chanEvents[server][where].push(index);
    }
    else {
      if(!knowsQuerier(server,who)) addQuerier(server,who);
      queryEvents[server][who].push(index);
    }
  };

  my.getServers = function () {
    return servers;
  };

  my.getChannels = function(server) {
    if(knowsServer(server))
      return channels[server];
  };

  my.getQueriers = function(server) {
    if(knowsServer(server))
      return queriers[server];
  };

  //add the input events' indices to the system
  for (var i = 0; i < events.size(); i++) {
    addEvent(i, events.get(i));
  }

  return my;
};















