//= require lib/jquery-1.8.2
//= require lib/chirp
//= require lib/highcharts

var twitterChart;
var chirpTemplate = {
	base:'<ul>{{tweets}}</ul>',
	tweet: '<li class="tweet"><div class="tweet-prefix">&ldquo;</div><span class="tweet-body">{{html}}</span><span class="tweet-meta"><time><a href="http://twitter.com/{{user.screen_name}}/statuses/{{id_str}}">{{time_ago}}</a></time></span></li>'
}

function onChirpSuccess ( data ) {
	$('.twitter').show();
	var tweetHistory = [];
	$.each ( data, function(index, value) {
		var d = new Date ( value.created_at );
		var rd = new Date ( d.getFullYear(), d.getMonth(), d.getDate() );
		var match = false;
		var i = tweetHistory.length; while (i--) {
			if (tweetHistory[i].x.getTime() == rd.getTime()) {
				console.log ( 'match' );
				tweetHistory[i].y++;
				match = true;
				break;
			}
		}
		if (!match) tweetHistory.push ( {"x":rd, "y":1} );
	});

	console.log (tweetHistory);

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

function onChirpFail ( error ) {
	$('.twitter').hide();
}

Chirp({
	user: 'mr_ino', //Twitter username
	max: 5, //Maximum number of tweets to show
	count: 100, //Total tweets to retrieve
	retweets: true, //Show/Don't show retweets
	replies: false,  //Show/Don't show replies
	target: "twitter-content", //Target the id "twitter"
	templates: chirpTemplate, // Use custom template
	success: onChirpSuccess,
	error: onChirpFail,
	cacheExpire: 1000 * 60 * 60 //Number of milliseconds to cache tweets
})


