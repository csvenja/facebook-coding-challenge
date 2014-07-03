function layOutDay(events) {
	"use strict";
	for (var i = 0; i < events.length; i++) {
		currentEvent = new Event(events[i]);
	};
}

function Event(args) {
	this.start = args[start];
	this.end = args[end];
	this.title = "Sample Item";
	this.location = "Sample Location";
}
