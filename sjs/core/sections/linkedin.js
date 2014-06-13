(function(window, document, $) {
	"use strict";

	var startTime, endTime;
	var linkedin_feed = 'http://www.linkedin.com/in/jamestomasino';

	var LinkedIn = function ( elID, parentEl, icon, analytics ) {
		startTime = new Date().getTime();
		this.el = $(elID);
		this.parentel = $(parentEl);
		this.icon = $(icon);
		this.searchContent = '';
		this.output = '';
		this.analytics = analytics;

		$.when (
			$.ajax ( { type: 'GET',
				url: 'services/linkedin.php?u=' + linkedin_feed,
				dataType: 'html'
			})
		).then( $.proxy(this._onLinkedInSuccess, this), $.proxy(this._onLinkedInFail, this) );
	};

	var p = LinkedIn.prototype;

	p._onLinkedInSuccess = function ( o ){
		try {
			var searchContainer = document.createElement("div");
			searchContainer.innerHTML = o;
			this.searchContent = searchContainer.getElementsByClassName('position');
		} catch (e) {
			this._onLinkedInFail();
			return;
		}

		this.output = '';
		var title = '';
		var org = '';
		var period = '';
		var desc = '';
		for (var i = 0; i < Math.min(9, this.searchContent.length); ++i){
			try {
				title = this.searchContent[i].getElementsByClassName('title')[0].innerHTML;
				org = this.searchContent[i].getElementsByClassName('org')[0].innerHTML;
				period = this.searchContent[i].getElementsByClassName('period')[0].innerHTML;
				desc = this.searchContent[i].getElementsByClassName('description')[0].innerHTML;

				this.output += '<article>';
				this.output += '<span class="position-title">' + title + ' - ' + org + '</span>';
				this.output += '<div class="period">' + period + '</div>';
				this.output += '<section class="desc">' + desc + '</section>';
				this.output += '</article>';
			} catch (e) {
				console.log (e);
			}
		}

		// If no data found, count that as a failure
		if (this.output === '') {
			this._onLinkedInFail();
		} else {
			this.icon.removeClass('disabled');
			this.parentel.find('.loading').remove();
			this.el.html(this.output);
			endTime = new Date().getTime();
			var timeSpent = endTime - startTime;
			this.analytics.trackTime( 'linkedin', timeSpent );

		}
	};

	p._onLinkedInFail = function ( e ) {
		this.icon.css({opacity:0.5});
		this.parentel.hide();
	};

	window.LinkedIn = LinkedIn;

})(window, document, jQuery);
