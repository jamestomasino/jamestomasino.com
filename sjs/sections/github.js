(function(window, document, $, store, Highcharts, Handlebars) {
	"use strict";

	// Paths
	var githubTemplatePath = 'templates/github.handlebars';
	var github_api_repos = 'https://api.github.com/users/jamestomasino/repos?type=owner&sort=pushed';
	var github_api_commits_head = 'https://api.github.com/repos/jamestomasino/';
	var githubChart;

	// Only get new github data after a day. Preserve on requests.
	var timeDelta = 100000000;
	var lastQueryDate = store.get ('jamestomasino_github_lastquery');
	var d = new Date();

	var Github = function ( id, parentid ) {
		this.repoJSON
		this.repoTemplate;

		this.el = $(id);
		this.parentel = $(parentid);

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
			).then( $.proxy(this._onDataSuccess, this), $.proxy(this._onDataFail, this ));
		} else {
			this._onDataFail();
		}
	}

	var p = Github.prototype;

	p._onDataSuccess = function ( repoHandlebars, repoData ) {

		this.repoTemplate = Handlebars.compile(repoHandlebars[0]);
		this.repoJSON = repoData[0].data;
		if (this.repoJSON && this.repoJSON.message && (this.repoJSON.message.search('API Rate Limit Exceeded' != -1))) {
			this._onDataFail();
		} else {
			store.set ('jamestomasino_github_lastquery', d);
			store.set ('jamestomasino_github', this.repoJSON );
			this._processJSON ();
		}
	}

	p._onDataFail = function ( error ) {
		this.repoJSON = store.get ('jamestomasino_github');
		if (this.repoJSON && this.repoJSON.message && (this.repoJSON.message.search('API Rate Limit Exceeded' != -1))) {
			store.clear(); // Something horrible happened. Lets reset.
			this.parentel.hide();
		} else if (this.repoJSON == undefined ){
			this.parentel.hide();
		}
		$.ajax (githubTemplatePath).then( $.proxy(this._storeHandlebars, this) );
	}

	p._storeHandlebars = function ( data ) {
		this.repoTemplate = Handlebars.compile(data);
		this._processJSON ();
	}

	p._processJSON = function () {
		if (this.repoJSON && this.repoTemplate) {
			for ( var i = 0; i < Math.min(12, this.repoJSON.length); ++i ) {
				var repo = $(this.repoTemplate(this.repoJSON[i]));
				this.el.append(repo);
			}
		}
	}

	window.Github = Github;

}(window, document, jQuery, store, Highcharts, Handlebars ));
