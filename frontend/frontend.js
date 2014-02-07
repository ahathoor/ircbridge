
'use strict';

var ib = (function() {
	var my = {};
	var serverpath = '..';

	my.getServers = function() {
		$.getJSON(serverpath + '/servers').done(function(data) {
			var servers = JSON.parse(data);
			servers.forEach(function(element) {
				$('#servers').append('<span class=server>' + element + '</span>');
			});
		});
	};
	my.loadChannels = function(server) {
		$.getJSON(serverpath + '/channels?server=' + server).done(function(data) {
			var channels = JSON.parse(data);
			channels.forEach(function(element) {
				$('#servers').append('<span class=server>' + element + '</span>');
			});
		});
	};
	return my;
})();

$(document).ready(function() {
	ib.getServers();
});

$('body').on('click', '.server', function() {
	ib.loadChannels($(this).text());
});