(function(window, document, $) {
	"use strict";

	var linkedin_feed = 'http://www.linkedin.com/in/jamestomasino'

	var LinkedIn = function ( elID, parentEl, hideOnFail ) {
		this.el = $(elID);
		this.parentel = $(parentEl);
		this.hideOnFail = hideOnFail;
		this.searchContent;
		this.output;

		$.when (
			$.ajax ( { type: 'GET',
				url: 'services/linkedin.php?u=' + linkedin_feed,
				dataType: 'html'
			})
		).then( $.proxy(this._onLinkedInSuccess, this), $.proxy(this._onLinkedInFail, this) );
	}

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
				title = this.searchContent[i].getElementsByClassName('title')[0].innerText;
				org = this.searchContent[i].getElementsByClassName('org')[0].innerHTML;
				period = this.searchContent[i].getElementsByClassName('period')[0].innerHTML;
				desc = this.searchContent[i].getElementsByClassName('description')[0].innerHTML;

				this.output += '<article>'
				this.output += '<span class="position-title">' + title + ' - ' + org + '</span>';
				this.output += '<div class="period">' + period + '</div>';
				this.output += '<section class="desc">' + desc + '</section>';
				this.output += '</article>';
			} catch (e) {
				console.log (e);
			}
		}

		// If no data found, count that as a failure
		if (this.output == '') {
			this._onLinkedInFail();
		} else {
			this.parentel.find('.loading').remove();
			this.el.html(this.output);
		}
	}

	p._onLinkedInFail = function ( e ) {
		if ( typeof this.hideOnFail == 'string' ) {
				$(this.hideOnFail).hide();
		} else if ( this.hideOnFail.length > 0 ) {
			for (var i = 0; i < this.hideOnFail.length; ++i ) {
				$(this.hideOnFail[i]).hide();
			}
		}
	}

	window.LinkedIn = LinkedIn;

})(window, document, jQuery);
