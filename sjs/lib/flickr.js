(function($, window, doc){
	"use strict";

	function delegate (object, method) {
		var shim = function() {
			return method.apply(object, arguments);
		}
		return shim;
	}

	function Flickr() {

		this.serviceBase = "http://api.flickr.com/services/rest/?format=json";
		this.searchMethod = "&method=flickr.photos.search";
		this.sizeMethod = "&method=flickr.photos.getSizes";
		this.page = "&per_page=500&page=1";
		this.userid = "&user_id=64735379@N00";
		this.api = "&api_key=c3c9b8e45305233bb97e431394dfb082&jsoncallback=?";

		this.callback;
		this.currentTitle = '';
		this.currentURL = '';
		this.currentHeight = 0;
		this.currentWidth = 0;
	}

	Flickr.prototype.parseSearchData = function ( json ) {
		var photos = json.photos.photo;
		var length = photos.length;
		var randIndex = Math.round ( Math.random() * length );
		var randPhoto = photos[randIndex];

		this.currentTitle =  randPhoto.title;
		this.id = '&photo_id=' + randPhoto.id;

		var call = this.serviceBase + this.sizeMethod + this.page + this.id + this.api;
		$.getJSON( call, delegate ( this, this.parseSizeData ) );
	}

	Flickr.prototype.parseSizeData = function ( json ) {
		var sizes = json.sizes.size;
		this.currentURL = '';
		this.currentHeight = 0;
		this.currentWidth = 0;

		var i = sizes.length; while (i--) {
			var photo = sizes[i];
			if (photo.label == 'Large 1600' || photo.label == 'Large' )
			{
				this.currentURL = photo.source;
				this.currentHeight = Number(photo.height);
				this.currentWidth = Number(photo.width);
				break;
			}
		}

		// No Large size, try again
		if (this.currentURL == '') this.showRandomPicture;
		else {
			var obj = { 'url': this.currentURL, 'title': this.currentTitle, 'height': this.currentHeight, 'width': this.currentWidth };
			this.callback.call ( this, obj );
		}
	}

	Flickr.prototype.getTitle = function () {
		return this.currentTitle;
	}

	Flickr.prototype.getImage = function () {
		return this.currentURL;
	}

	Flickr.prototype.showRandomPicture = function ( callback ){
		this.callback = callback;
		var call = this.serviceBase + this.searchMethod + this.page + this.userid + this.api;
		$.getJSON( call, delegate ( this, this.parseSearchData ) );
	}

	if (typeof exports !== 'undefined') exports.Flickr = Flickr;
	else window.Flickr = Flickr;

})(jQuery, window, document);
