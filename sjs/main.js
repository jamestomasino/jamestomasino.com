//= require sections/analytics
//= require sections/coderbits
//= require sections/github
//= require sections/twitter
//= require sections/linkedin

var analytics = new Analytics( 'UA-7902638-1' );
var coderbits = new Coderbits( '#coderbits-chart', '.coderbits', '.icon_coderbits', analytics );
var github = new Github ( '#github-content', '#github-graph', '.github', '.icon_github', analytics );
var twitter = new Twitter ( '#twitter-content', '345536786895884290', '.twitter', '.icon_twitter', analytics );
var linkedin = new LinkedIn ( '#linkedin-content', '.linkedin', '.icon_linkedin', analytics );
