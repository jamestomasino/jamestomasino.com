//= require lib/chirp

var twitterTemplate = {
	base:'{{tweets}}',
	tweet: '<p class="tweet">{{html}} - <span class="meta"><time><a href="http://twitter.com/{{user.screen_name}}/statuses/{{id_str}}">{{time_ago}}</a></time></span></p>'
}


Chirp({
  user: 'mr_ino', //Twitter username
  max: 10, //Maximum number of tweets to show
  count: 100, //Total tweets to retrieve
  retweets: true, //Show/Don't show retweets
  replies: false,  //Show/Don't show replies
  target: "twitter", //Target the id "twitter"
  templates: twitterTemplate, // Use custom template
  cacheExpire: 1000 * 60 * 60 //Number of milliseconds to cache tweets
})
