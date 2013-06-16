//= require sections/coderbits
//= require sections/github
//= require sections/twitter
//= require sections/linkedin
//= require sections/analytics

var coderbits = new Coderbits( '#coderbits-chart', '.coderbits' );
var github = new Github ( '#github-content', '#github-graph', '.github' );
var twitter = new Twitter ( '#twitter-content', '345536786895884290', '.twitter');
var linkedin = new LinkedIn ( '#linkedin-content', '.linkedin');
var analytics = new Analytics( 'UA-7902638-1' );
