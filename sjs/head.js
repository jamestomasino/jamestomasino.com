//= require lib/modernizr

Modernizr.load([
	{ test: window.matchMedia, nope: ['js/polyfill/matchMedia.js', 'js/polyfill/matchMedia.addListener.js'] },
	{ test: window.svg, nope: 'js/polyfill/raphael.vml.js' },
	"js/libs.js",
	"js/main.js"
]);
