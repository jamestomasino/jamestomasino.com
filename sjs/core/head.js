//= require ../lib/modernizr

Modernizr.load([
	{ test: window.matchMedia, nope: ['js/polyfill/media.match.js', 'js/polyfill/respond.js' ] },
	{ test: Modernizr.svg, nope: 'js/polyfill/raphael.vml.js' },
	"js/libs.js",
	"js/main.js"
]);
