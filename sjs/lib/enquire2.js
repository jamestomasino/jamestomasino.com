window.enquire2 = window.enquire2 || ( function( window, document, matchMedia, undefined ) {

	"use strict";

	var bool;

	// Add more options to increase library features
	var options = {
		'device': 'screen',
		'min-width': undefined,
		'max-width': undefined
	}

	return function( opt ){

		// override defaults
		for (var s in options) {
			if ( opt.hasOwnProperty(s) ) options[s] = opt[s];
		}

		var query = '';

		// Handle Various Option Types by converting to media query syntax
		if ( options['device'] !== undefined ) {
			query += options['device'];
		}

		if ( options['min-width'] !== undefined ) {
			if (typeof options['min-width'] == 'number' ) options['min-width'] = options['min-width'] + 'px';
			query += ' and (min-width' + options['min-width'] + ')';
		}

		if ( options['max-width'] !== undefined ) {
			if (typeof options['max-width'] == 'number' ) options['max-width'] = options['max-width'] + 'px';
			query += ' and (max-width' + options['max-width'] + ')';
		}

		return matchMedia(q);

	};

})( window, document, matchMedia );

