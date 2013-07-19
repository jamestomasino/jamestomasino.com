window.enquire2 = window.enquire2 || ( function( window, document, matchMedia, undefined ) {

	"use strict";

	var bool;

	// Add more options to increase library features
	var globalOptions = {
		'device': 'screen',
		'min-width': undefined,
		'max-width': undefined
	}

	var clone = function (obj) {
		// Handle the 3 simple types, and null or undefined
		if (null == obj || "object" != typeof obj) return obj;
		// Handle Object
		if (obj instanceof Object) {
			var copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
			}
			return copy;
		}
	}

	var register = function (opt, handlers) {
		// override defaults
		var options = clone(globalOptions);

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
			query += ' and (min-width: ' + options['min-width'] + ')';
		}

		if ( options['max-width'] !== undefined ) {
			if (typeof options['max-width'] == 'number' ) options['max-width'] = options['max-width'] + 'px';
			query += ' and (max-width: ' + options['max-width'] + ')';
		}

		return new MediaQuery(query, handlers);
	}

	function MediaQuery ( query, handlers ) {
		var self = this;

		self.query = query;
		self.handlers = handlers;
		self.mql = matchMedia(query);
		self.matched = false;

		self.listener = function (mql) {
			self.mql = mql;
			self.assess();
		}

		self.mql.addListener(self.listener);

		return self.mql;
	}

	MediaQuery.prototype = {

		assess : function () {

			console.log (self);
			var matches = self.mql.matches;

			if ( matches && !self.matched ) {
				if ( self.handlers.hasOwnProperty('match') ) {
					self.matched = true;
					self.handlers.match();
				}
			} else if ( !matches && self.matched ) {
				if ( self.handlers.hasOwnProperty('unmatch') ) {
					self.matched = false;
					self.handlers.unmatch();
				}
			}
		}
	}



	return {
		register: register
	}

})( window, document, matchMedia );

