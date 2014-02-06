'use strict';

exports.create =
  function() {
    var my = {};

    var servers = [];
    var channels = {};
    var chanMessages = {};

    var queriers = {}; // Contains a list of nick's that have queried you
    var queryMessages = {};


    var addServer = function (server) {
      servers.push(server);  //list the server
      channels[server] = []; //make an entry in the channel list
      chanMessages[server] = {}; //A new object in the chanMessages object

      queriers[server] = [];
      queryMessages[server] = {};
    };

    var addChannel = function(server, channel) {
      channels[server].push(channel); //A new channel entry in the channels bookkeeping
      chanMessages[server][channel] = []; //A new list for chanMessages in the chanMessages object
    };

    var addQuerier = function(server, user) {
      queriers[server].push(user);
      queryMessages[server][user] = [];
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

    var addQuery = function(server, from, message) {
      if(!knowsQuerier(server,from)) addQuerier(server,from);
      queryMessages[server][from].push(newMessage(from,message));
    };

    var addChanMessage = function(server, from, channel, message) {
      if (!knowsChannel(channel)) addChannel(server, channel);
      chanMessages[server][channel].push(newMessage(from, message));
    };

    my.addMessage = function(server, from, to, message) {
      if (!knowsServer(server)) addServer(server);
      if (to.indexOf('#') == -1 || to.indexOf('&') == -1) {
        addChanMessage(server, from, to, message);
      }
      else {
        addQuery(server,from,message);
      }
    };

    my.getServers = function () {
      return servers;
    };
    my.getChannels = function(server) {
      if(knowsServer(server))
        return channels[server];
    };

    my.getMessages = function(server, channel) {
      if(knowsChannel(server,channel))
        return chanMessages[server][channel];
    };

    my.getQueriers = function(server) {
      if(knowsServer(server))
        return queriers[server];
    };

    var newMessage = function(from, message) {
      return {
        date : (new Date()).toJSON(),
        from : from,
        message : message
      };
    };

    return my;
  };
