(function(window, document, $) {
	"use strict";

	var startTime, endTime;

	var Twitter = function ( elID, twitterID, parentEl, icon, analytics ) {
		startTime = new Date().getTime();
		this.el = $(elID);
		this.parentEl = $(parentEl);
		this.twitterID = twitterID;
		this.icon = $(icon);
		this.analytics = analytics;

		var twitter_feed = "http://cdn.syndication.twimg.com/widgets/timelines/" + this.twitterID + "?&lang=en&suppress_response_codes=true&rnd=" + Math.random();
		$.when (
			$.ajax ( { type: 'GET',
				url: twitter_feed,
				dataType: 'jsonp'
			})
		).then( $.proxy(this._onDataSuccess, this), $.proxy(this._onDataFail,this) );

	}

	var p = Twitter.prototype;

	p._onDataSuccess = function ( tweets ) {
		var searchContainer = $("<div></div>");
		searchContainer.html (tweets.body);

		var entryTitles = searchContainer.find(".e-entry-title");
		var entryTimes = searchContainer.find(".dt-updated");

		this.parentEl.find('.loading').remove();

		for (var i = 0; i < Math.min(12, entryTitles.length); ++i ) {
			var tweetBody = $(entryTitles[i]);
			var tweetMeta = $(entryTimes[i]);
			tweetBody.removeClass().addClass('tweet-body');
			tweetMeta.removeClass().addClass('tweet-meta');
			var tweet = $('<article class="tweet"></article>');
			tweet.append(tweetBody);
			tweet.append(tweetMeta);
			this.el.append(tweet);
		}

		this.icon.removeClass('disabled');
		endTime = new Date().getTime();
		var timeSpent = endTime - startTime;
		this.analytics.trackTime( 'twitter', timeSpent );

	}

	p._onDataFail = function ( error ) {
		this.parentEl.hide();
		this.icon.css({opacity:0.5});
	}

	window.Twitter = Twitter;

})(window, document, jQuery);
