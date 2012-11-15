//= require ../lib/jquery-1.8.2
//= require ../lib/store
//= require ../lib/highcharts

(function(window, document, $, store, Highcharts) {
	"use strict";

	var github_api_repos = 'https://api.github.com/users/jamestomasino/repos?type=owner&sort=updated';
		// name property = repo name for commits query
	var github_api_commits = 'https://api.github.com/repos/jamestomasino/sass-boilerplate/commits';
	var githubChart;

	/*
	 *githubChart = new Highcharts.Chart({
	 *    chart: {
	 *        renderTo: 'github-graph',
	 *        type: 'spline',
	 *        height: 200
	 *    },
	 *    credits : {
	 *        enabled : false
	 *    },
	 *    exporting: { enabled: false },
	 *    title: {
	 *        text: null
	 *    },
	 *    tooltip: {
	 *        enabled: false
	 *    },
	 *    xAxis: {
	 *        type: 'datetime',
	 *        tickPixelInterval: 50,
	 *        showFirstLabel: false,
	 *        startOnTick: true,
	 *        endOnTick: true,
	 *        labels: {
	 *            rotation: -45,
	 *            align: 'right'
	 *        }
	 *    },
	 *    yAxis: {
	 *        type: 'number',
	 *        gridLineWidth: 0,
	 *        lineWidth: 0,
	 *        minorGridLineWidth: 0,
	 *        lineColor: 'transparent',
	 *        labels: {
	 *            enabled: false
	 *        },
	 *        minorTickLength: 0,
	 *        tickLength: 0,
	 *        title: {
	 *            text: null
	 *        }
	 *    },
	 *    series:[{
	 *        showInLegend: false,
	 *        name: 'Tweet History',
	 *        data: tweetHistory
	 *    }]
	 *});
	 */

}(window, document, jQuery, store, Highcharts ));
