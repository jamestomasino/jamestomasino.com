//= require ../lib/jquery-1.8.2
//= require ../lib/store
//= require ../lib/chirp
//= require ../lib/highcharts

(function(window, document, $, store, Highcharts, Chirp) {
	"use strict";

	var twitterChart;
	var chirpTemplate = {
		base:'<ul>{{tweets}}</ul>',
		tweet: '<li class="tweet"><div class="tweet-prefix">&ldquo;</div><span class="tweet-body">{{html}}</span><span class="tweet-meta"><time><a href="http://twitter.com/{{user.screen_name}}/statuses/{{id_str}}">{{time_ago}}</a></time></span></li>'
	};

	function onChirpSuccess ( data ) {
		store.set ('jamestomasino_chirp', data );
		if (data != null) buildTweetContent ( data )
	}

	function onChirpFail ( error ) {
		// Fallback on localstorage version if it exists
		var data = store.get ( 'jamestomasino_chirp' );
		if (data != null) buildTweetContent ( data )
			else $('.twitter').hide();
	}

	function buildTweetContent ( data ) {

		$('.twitter').show();

		var tweetHistory = [];
		$.each ( data, function(index, value) {
			var d = new Date ( value.created_at );
			var rd = new Date ( d.getFullYear(), d.getMonth(), d.getDate() );
			var match = false;
			var i = tweetHistory.length; while (i--) {
				if (tweetHistory[i].x.getTime() == rd.getTime()) {
					tweetHistory[i].y++;
					match = true;
					break;
				}
			}

			if (!match) tweetHistory.push ( {"x":rd, "y":1} );
		});

		twitterChart = new Highcharts.Chart({
			chart: {
				renderTo: 'twitter-graph',
				type: 'spline',
				height: 200
			},
			credits : {
				enabled : false
			},
			exporting: { enabled: false },
			title: {
				text: null
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 50,
				showFirstLabel: false,
				startOnTick: true,
				endOnTick: true,
				labels: {
					rotation: -45,
					align: 'right'
				}
			},
			yAxis: {
				type: 'number',
				gridLineWidth: 0,
				lineWidth: 0,
				minorGridLineWidth: 0,
				lineColor: 'transparent',
				labels: {
					enabled: false
				},
				minorTickLength: 0,
				tickLength: 0,
				title: {
					text: null
				}
			},
			series:[{
				showInLegend: false,
				name: 'Tweet History',
				data: tweetHistory
			}]
		});


	}

	Chirp({
		user: 'mr_ino', //Twitter username
		max: '5', //Maximum number of tweets to show
		count: '100', //Total tweets to retrieve
		retweets: 'true', //Show/Don't show retweets
		replies: 'false',  //Show/Don't show replies
		target: "twitter-content", //Target the id "twitter"
		templates: chirpTemplate, // Use custom template
		success: onChirpSuccess,
		error: onChirpFail,
		cacheExpire: 1000 * 60 * 60 * 6 // 6 hours cache
	})

}(window, document, jQuery, store, Highcharts, Chirp));
