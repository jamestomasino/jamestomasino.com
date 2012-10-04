(function(window, doc){
	"use strict";

	function delegate (object, method) {
		var shim = function() {
			return method.apply(object, arguments);
		}
		return shim;
	}

	function AppCacheMediator () {
		this.appCache = window.applicationCache;

		// Fired after the first cache of the manifest.
		this.appCache.addEventListener('cached', delegate( this, this.onCacheCached ), false);

		// Checking for an update. Always the first event fired in the sequence.
		this.appCache.addEventListener('checking', delegate( this, this.onCacheChecking ), false);

		// An update was found. The browser is fetching resources.
		this.appCache.addEventListener('downloading', delegate( this, this.onCacheDownloading ), false);

		// The manifest returns 404 or 410, the download failed,
		// or the manifest changed while the download was in progress.
		this.appCache.addEventListener('error', delegate( this, this.onCacheError ), false);

		// Fired after the first download of the manifest.
		this.appCache.addEventListener('noupdate', delegate( this, this.onCacheNoUpdate ), false);

		// Fired if the manifest file returns a 404 or 410.
		// This results in the application cache being deleted.
		this.appCache.addEventListener('obsolete', delegate( this, this.onCacheObsolete ), false);

		// Fired for each resource listed in the manifest as it is being fetched.
		this.appCache.addEventListener('progress', delegate( this, this.onCacheProgress ), false);

		// Fired when the manifest resources have been newly redownloaded.
		this.appCache.addEventListener('updateready', delegate( this, this.onCacheUpdate ), false);
	}

	AppCacheMediator.prototype.onCacheCached = function (e) {

	}

	AppCacheMediator.prototype.onCacheChecking = function (e) {

	}
	AppCacheMediator.prototype.onCacheDownloading = function (e) {

	}
	AppCacheMediator.prototype.onCacheNoUpdate = function (e) {

	}
	AppCacheMediator.prototype.onCacheObsolete = function (e) {

	}
	AppCacheMediator.prototype.onCacheProgress = function (e) {

	}

	AppCacheMediator.prototype.onCacheUpdate = function (e) {
		this.appCache.swapCache();
		window.location.reload();
	}

	AppCacheMediator.prototype.onCacheError = function (e) {
		console.log('Error: Cache failed to update!');
	}

	AppCacheMediator.prototype.getStatus = function () {

		switch (this.appCache.status) {
		  case this.appCache.UNCACHED: // UNCACHED == 0
			return 'UNCACHED';
			break;
		  case this.appCache.IDLE: // IDLE == 1
			return 'IDLE';
			break;
		  case this.appCache.CHECKING: // CHECKING == 2
			return 'CHECKING';
			break;
		  case this.appCache.DOWNLOADING: // DOWNLOADING == 3
			return 'DOWNLOADING';
			break;
		  case this.appCache.UPDATEREADY:  // UPDATEREADY == 4
			return 'UPDATEREADY';
			break;
		  case this.appCache.OBSOLETE: // OBSOLETE == 5
			return 'OBSOLETE';
			break;
		  default:
			return 'UKNOWN CACHE STATUS';
			break;
		};

	}

	AppCacheMediator.prototype.update = function () {
		try {
			this.appCache.update();
		} catch (e) {
			console.log (e.message);
		}
	}

	if (typeof exports !== 'undefined') exports.AppCacheMediator = AppCacheMediator;
	else window.AppCacheMediator = AppCacheMediator;

})(window, document);
