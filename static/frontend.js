
'use strict';

var syncarray = syncarray || {};
var ircIndex = ircIndex || {};

var ib = (function() {
	var my = {};
	var server = '../';
	var events = {};
	var index = {};
	my.fetchAll = function() {
		$.post(server, {request: 'fetch all'}).done(function(data) {
			events = syncarray.create().fromJSON(data);
			index = ircIndex(events);
		});
	};
	my.fetchNew = function() {
		$.post(server, {request: 'fetch new', latest: events.size()}).done(function(data) {
			events.addElements(data);
			index = ircIndex(events);
		});
	};
	my.print = function() {
		console.log(events.size());
	};
	return my;
})();

// $(document).ready(function() {
// 	ib.getServers();
// });

// $('body').on('click', '.server', function() {
// 	ib.loadChannels($(this).text());
// });




$(window).on('hashchange',function() {
    var hash = location.hash.substring(1); // strip the leading # symbol
    // now run code based on whatever the value of 'hash' is
});