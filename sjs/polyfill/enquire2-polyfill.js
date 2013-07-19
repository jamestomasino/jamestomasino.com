window.enquire2 = ( function( window, document, undefined ) {

	"use strict";

	var bool;
	var resizeTimeoutId;
	var options = {
		'min-width': undefined,
		'max-width': undefined
	}

	var addEvent = function(elem, type, eventHandle) {
		if (elem == null || elem == undefined) return;
		if ( elem.addEventListener ) {
			elem.addEventListener( type, eventHandle, false );
		} else if ( elem.attachEvent ) {
			elem.attachEvent( "on" + type, eventHandle );
		} else {
			elem["on"+type]=eventHandle;
		}
	};

	addEvent ( window, 'resize', onResize );
	addEvent ( window, 'load', resizeTest );

	var clone = function (obj) {
		// Handle Object
		if (obj instanceof Object) {
			var copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
			}
			return copy;
		}
	}

	var onResize = function (e) {
		window.clearTimeOut(resizeTimeoutId);
		resizeTimeOutId = window.setTimeout('resizeTest();', 300);
	}

	var resizeTest = function () {
		console.log ('resizeTest');
	}

	return function(q){

		// Get window dimensions
		var e = document.documentElement,
		g = document.getElementsByTagName('body')[0],
		x = window.innerWidth || e.clientWidth || g.clientWidth,
		y = window.innerHeight|| e.clientHeight|| g.clientHeight;

		// override defaults
		for (var s in options) {
			if ( opt.hasOwnProperty(s) ) options[s] = opt[s];
		}

		var bool = true;

		// Handle Various Option Types by converting to media query syntax
		if ( options['device'] !== undefined ) {
			if ( options['device'] !== 'screen' ) bool = false;
		}

		if ( options['min-width'] !== undefined ) {
			if (typeof options['min-width'] !== 'number' ) options['min-width'] = parseInt(options['min-width'], 10);
			if (x < options['min-width']) bool = false;
		}

		if ( options['max-width'] !== undefined ) {
			if (typeof options['max-width'] !== 'number' ) options['max-width'] = parseInt(options['min-width'], 10);
			if (x > options['max-width']) bool = false;
		}

		return {
			matches: bool,
			media: 'no matchmedia'
		};


	};

})( window, document );


