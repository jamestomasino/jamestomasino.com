(function(window, document, $) {
	"use strict";

	var Analytics = function ( id ) {

		// Add Google Analytics script tag
		(function (win, doc, o, url, r, a, m) {
			win['GoogleAnalyticsObject'] = r;
			win[r] = win[r] || function () {
				(win[r].q = win[r].q || []).push(arguments)
			}, win[r].l = 1 * new Date();
			a = doc.createElement(o),
			m = doc.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = url;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

		// Set up Tracking object (allow localhost testing)
		if (/localhost/i.test(document.location.origin)) {
			window.ga('create', id, {
			  'cookieDomain': 'none'
			});
		} else {
			window.ga('create', id);
		}
		window.ga('send', 'pageview');

		// Hijack links to enable tracking
		$('a').bind('click touchend', trackLink )

		function trackLink (event) {
			event.preventDefault();
			var context = $(this).context;
			var text = context.text;
			var href = context.href;

			ga('send', 'event', 'link', 'click', text, {
				'hitCallback': function() {
					document.location = href;
				}
			} );

			return false;
		}
	}

	window.Analytics = Analytics;

})(window, document, jQuery);
