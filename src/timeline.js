/* global Mustache:false, $:false */

$(function () {
	"use strict";

	var start = 9;
	var end = 21;
	for (var i = start; i <= end; i++) {
		var oclockHTML = "<p class='oclock'>{{ hour }}:00 <span class='ampm'>{{ ampm }}</span></p>";
		var halfclockHTML = "<p class='halfclock'>{{ hour }}:30</p>";
		var html = Mustache.render(oclockHTML, {
			hour: i <= 12 ? i : i - 12,
			ampm: i < 12 ? "AM" : "PM"
		});
		$("#timeline").append(html);
		if (i != end) {
			html = Mustache.render(halfclockHTML, {
				hour: i <= 12 ? i : i - 12
			});
			$("#timeline").append(html);
		}
	}
});
