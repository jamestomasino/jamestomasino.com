(function(window, document, $, store, Highcharts, Handlebars, CalHeatMap) {
	"use strict";

	// Paths
	var githubTemplatePath = 'templates/github.handlebars';
	var github_api_repos = 'https://api.github.com/users/jamestomasino/repos?type=owner&sort=pushed';
	var github_api_activity = 'https://github.com/users/jamestomasino/contributions_calendar_data';
	var github_api_commits_head = 'https://api.github.com/repos/jamestomasino/';
	var githubChart;

	// Only get new github data after a day. Preserve on requests.
	var timeDelta = 100000000;
	var lastQueryDate = store.get ('jamestomasino_github_lastquery');
	var d = new Date();
	var startTimeRepo, endTimeRepo;
	var startTimeChart, endTimeChart;

	var Github = function ( contentid, chartid, parentid, icon, analytics ) {

		startTimeRepo = new Date().getTime();

		this.repoJSON
		this.repoTemplate;

		this.contentel = $(contentid);
		this.chartel = $(chartid);
		this.parentel = $(parentid);
		this.icon = $(icon);
		this.analytics = analytics;
		this.contentID = contentid;
		this.chartID = chartid;
		this.parentID = parentid;

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
			).then( $.proxy(this._onGithubRepoDataSuccess, this), $.proxy(this._onGithubRepoDataFail, this ));
		} else {
			this._onGithubRepoDataFail();
		}
	}

	var p = Github.prototype;

	p._onGithubRepoDataSuccess = function ( repoHandlebars, repoData ) {
		this.repoTemplate = Handlebars.compile(repoHandlebars[0]);
		this.repoJSON = repoData[0].data;
		if (this.repoJSON && this.repoJSON.message && (this.repoJSON.message.search('API Rate Limit Exceeded' != -1))) {
			this._onGithubRepoDataFail();
		} else {
			store.set ('jamestomasino_github_lastquery', d);
			store.set ('jamestomasino_github', this.repoJSON );
			startTimeChart = new Date().getTime();
			this._processJSON ();
			this.icon.removeClass('disabled');
			endTimeRepo = new Date().getTime();
			var timeSpentRepo = endTimeRepo - startTimeRepo;
			this.analytics.trackTime( 'github-repo', timeSpentRepo );

		}
	}

	p._onGithubRepoDataFail = function ( error ) {
		startTimeChart = new Date().getTime();
		this.repoJSON = store.get ('jamestomasino_github');
		if (this.repoJSON && this.repoJSON.message && (this.repoJSON.message.search('API Rate Limit Exceeded' != -1))) {
			store.clear(); // Something horrible happened. Lets reset.
			this.parentel.hide();
			this.icon.css({opacity:0.5});
		} else if (this.repoJSON == undefined ){
			this.parentel.hide();
			this.icon.css({opacity:0.5});
		} else {
			this.icon.removeClass('disabled');
			$.ajax (githubTemplatePath).then( $.proxy(this._storeHandlebars, this) );
		}
		endTimeRepo = new Date().getTime();
		var timeSpentRepo = endTimeRepo - startTimeRepo;
		this.analytics.trackTime( 'github-repo', timeSpentRepo );
	}


	p._onGithubActivityDataSuccess = function ( activityData ) {
		this.activityData = JSON.parse(activityData);

		var today = new Date();
		var start = new Date(today.getFullYear() - 1, today.getMonth() + 1);

		var data = {};
		for (var i = 0; i < this.activityData.length; ++i) {
			var activity = this.activityData[i];
			data[ String(new Date(activity[0]).getTime() / 1000) ] = activity[1];
		}

		this.cal = new CalHeatMap();
		this.cal.init({
			data: data,
			start: start,
			range: 12,
			dataType: 'json',
			id: 'github-graph',
			domain: 'month',
			subDomain: 'day',
			weekStartOnMonday: 0,
			domainGutter: -12,
			scale: [3,6,10,14],
			format: {
				date: "%e %B %Y",
				legend: "%b",
				connector: "on"
			},

		});
		this.chartel.show();
		endTimeChart = new Date().getTime();
		var timeSpentChart = endTimeChart - startTimeChart;
		this.analytics.trackTime( 'github-chart', timeSpentChart );

	}

	p._onGithubActivityDataFail = function ( error, textStatus, errorThrown ) {
		this.chartel.hide();
	}

	p._storeHandlebars = function ( data ) {
		this.repoTemplate = Handlebars.compile(data);
		this._processJSON ();
	}

	p._processJSON = function () {
		if (this.repoJSON && this.repoTemplate) {
			for ( var i = 0; i < Math.min(12, this.repoJSON.length); ++i ) {
				var repo = $(this.repoTemplate(this.repoJSON[i]));
				this.contentel.append(repo);
			}
		}

		// Test for SVG Functionality, or die
		if ( $('html').hasClass('no-svg') ) {
			this._onGithubActivityDataFail();
			return;
		}

		// Now that the basics are loaded, go for the heatmap
		$.when (
			$.ajax ( { type: 'GET',
				url: 'services/json.php?u=' + github_api_activity,
				dataType: 'text'
			})
		).then( $.proxy(this._onGithubActivityDataSuccess, this), $.proxy(this._onGithubActivityDataFail, this));
	}

	window.Github = Github;

}(window, document, jQuery, store, Highcharts, Handlebars, CalHeatMap ));
