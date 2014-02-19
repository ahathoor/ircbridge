
'use strict';

var syncList = syncList || {};
var ircIndex = ircIndex || {};

var ib = (function() {
	var my = {};
	var server = '../';
	var events = syncList.create();
	var index = ircIndex(events);
	my.fetchNew = function() {
		$.post(server, {request: 'fetch new', latest: events.size()}).done(function(data) {
			events.addElements(data);
		});
	};
	my.print = function() {
		console.log(events.size());
	};
	my.getIndexed = function () {
		return index;
	}
	return my;
})();

$(document).ready(function() {
	setInterval(ib.fetchNew, 1000);
});

// $('body').on('click', '.server', function() {
// 	ib.loadChannels($(this).text());
// });




$(window).on('hashchange',function() {
    var hash = location.hash.substring(1); // strip the leading # symbol
    // now run code based on whatever the value of 'hash' is
});