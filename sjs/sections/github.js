//= require ../lib/jquery-1.8.2
//= require ../lib/store
//= require ../lib/highcharts
//= require ../lib/handlebars-1.0.rc.1

(function(window, document, $, store, Highcharts, Handlebars) {
	"use strict";

	var repoJSON, repoTemplate;

	// Paths
	var githubTemplatePath = 'templates/github.handlebars';
	var github_api_repos = 'https://api.github.com/users/jamestomasino/repos?type=owner&sort=pushed';
	var github_api_commits_head = 'https://api.github.com/repos/jamestomasino/';
	var githubChart;

	// Only get new github data after a day. Preserve on requests.
	var timeDelta = 100000000;
	var lastQueryDate = store.get ('jamestomasino_github_lastquery');
	var d = new Date();
	if (lastQueryDate) {
		lastQueryDate = new Date (lastQueryDate);
		timeDelta = Math.abs(d.getTime() - lastQueryDate.getTime());
	}

	if (timeDelta > 86400000) {
		$.when (
			$.ajax ( githubTemplatePath ),
			$.ajax ( { type: 'GET',
				url: github_api_repos,
				dataType: 'jsonp'
			}),
			$(window).load()
		).then( onDataSuccess, onDataFail );
	} else {
		onDataFail();
	}

	function onDataSuccess ( repoHandlebars, repoData ) {

		repoTemplate = Handlebars.compile(repoHandlebars[0]);
		repoJSON = repoData[0].data;
		if (repoJSON && repoJSON.message && (repoJSON.message.search('API Rate Limit Exceeded' != -1))) {
			onDataFail();
		} else {
			store.set ('jamestomasino_github_lastquery', d);
			store.set ('jamestomasino_github', repoJSON );
			processJSON ();
		}
	}

	function onDataFail ( error ) {
		repoJSON = store.get ('jamestomasino_github');
		if (repoJSON && repoJSON.message && (repoJSON.message.search('API Rate Limit Exceeded' != -1))) {
			store.clear(); // Something horrible happened. Lets reset.
		}
		$.ajax ( githubTemplatePath).then( storeHandlebars );
	}

	function storeHandlebars ( data ) {
		repoTemplate = Handlebars.compile(data);
		processJSON ();
	}

	function processJSON () {

		var requests = [];
		if (repoJSON && repoTemplate) {
			for ( var i = 0; i < Math.min(10, repoJSON.length); ++i ) {
				var repo = $(repoTemplate(repoJSON[i]));
				$('#github-content').append(repo);
				requests.push($.ajax({
					type: 'GET',
					url: 'https://api.github.com/repos/jamestomasino/' + repoJSON[i].name + '/commits',
					dataType: 'jsonp'
				}));
			}
			$('.github').show();
		}
/*
		$.when.apply(requests).done(function() {
			for (i in requests) {
				requests[i].success(function(data) {
					var commits = data.data;
					console.log (commits);
				});
			}
		});
*/
	}

	function drawChart () {
		githubChart = new Highcharts.Chart({
			chart: {
				renderTo: 'github-graph',
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
			tooltip: {
				enabled: false
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

}(window, document, jQuery, store, Highcharts, Handlebars ));
