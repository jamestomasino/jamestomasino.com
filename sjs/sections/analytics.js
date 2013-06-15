(function(window, document) {
	"use strict";

	var Analytics = function ( id ) {
		// Configure Analytics Settings
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', id ]);
		_gaq.push(['_trackPageview']);

		// Put object into global space
		window._gaq = _gaq;

		// Add Google Analytics script tag
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	}

	window.Analytics = Analytics;

})(window, document);
