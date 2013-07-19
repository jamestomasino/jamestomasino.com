//= require lib/modernizr

Modernizr.load([
	{ test: window.matchMedia, nope: ['js/polyfill/respond.js', 'js/polyfill/enquire2-polyfill.js'] },
	{ test: Modernizr.svg, nope: 'js/polyfill/raphael.vml.js' },
	"js/libs.js",
	"js/main.js"
]);
