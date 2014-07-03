/* global Mustache:false, $:false */
"use strict";

function layOutDay(events) {
	var eventList = $("#events");
	$("#events").empty();
	for (var i = 0; i < events.length; i++) {
		var currentEvent = new Event(events[i]);
		eventList.append(currentEvent.getHTML());
	}
}

function Event(args) {
	this.top = args.start;
	this.height = args.end - args.start;
	this.width = "100%";
	this.title = "Sample Item";
	this.location = "Sample Location";
}

Event.prototype.getHTML = function() {
	var template = $("#eventTemplate").html();
	return Mustache.render(template, {
		top: this.top,
		height: this.height,
		width: this.width,
		title: this.title,
		location: this.location
	});
};

$(function() {
	var events = [{start: 30, end: 150}];
	layOutDay(events);
});
