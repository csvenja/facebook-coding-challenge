/* global Mustache:false, $:false */
"use strict";

function layOutDay(events) {
	var slot = new Slot();
	var i, j, added;
	var eventObject = [];
	var eventList = $("#events");
	$("#events").empty();

	for (i in events) {
		eventObject.push(new Event(events[i]));
	}

	eventObject.sort(sortEvents);

	for (i in eventObject) {
		if (eventObject[i].start >= slot.latest) {
			slot.clean();
			slot.addSlot();
			slot.addEvent(eventObject[i], 0);
		}
		else {
			added = false;
			for (j in slot.end) {
				if (eventObject[i].start >= slot.end[j]) {
					slot.addEvent(eventObject[i], j);
					added = true;
					break;
				}
			}
			if (!added) {
				slot.addSlot();
				slot.addEvent(eventObject[i], slot.end.length - 1);
			}
		}
	}
	slot.clean();

	for (i in eventObject) {
		eventList.append(eventObject[i].getHTML());
	}
}

function Slot() {
	this.end = [];
	this.member = [];
	this.latest = -1;
}

Slot.prototype.clean = function () {
	var totalSlots = this.end.length;
	for (var i in this.member) {
		for (var j in this.member[i]) {
			this.member[i][j].slotIndex = i;
			this.member[i][j].totalSlots = totalSlots;
		}
	}
	this.end = [];
	this.member = [];
};

Slot.prototype.addEvent = function (event, index) {
	this.end[index] = event.end;
	this.member[index].push(event);
	if (event.end > this.latest) {
		this.latest = event.end;
	}
};

Slot.prototype.addSlot = function () {
	this.end.push(-1);
	this.member.push([]);
};

function Event(argument) {
	this.start = argument.start;
	this.end = argument.end;
	this.title = "Sample Item";
	this.location = "Sample Location";
	this.slotIndex = 0;
	this.totalSlots = 1;
}

Event.prototype.top = function () {
	return this.start;
};

Event.prototype.left = function () {
	return this.width() * this.slotIndex;
};

Event.prototype.height = function () {
	return this.end - this.start;
};

Event.prototype.width = function () {
	return 100.0 / this.totalSlots;
};

Event.prototype.getHTML = function() {
	var template = $("#eventTemplate").html();
	return Mustache.render(template, {
		top: this.top(),
		left: this.left() + "%",
		height: this.height(),
		width: this.width() + "%",
		title: this.title,
		location: this.location
	});
};

function sortEvents(eventCurrent, eventNext) {
	return eventCurrent.start - eventNext.start;
}

$(function() {
	var events = [{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}];
	layOutDay(events);
});
