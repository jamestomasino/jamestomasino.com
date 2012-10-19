//= require lib/chirp

var twitterTemplate = {
	base:'<ul>{{tweets}}</ul>',
	tweet: '<li class="tweet"><div class="tweet-prefix">&ldquo;</div><span class="tweet-body">{{html}}</span><span class="tweet-meta"><time><a href="http://twitter.com/{{user.screen_name}}/statuses/{{id_str}}">{{time_ago}}</a></time></span></li>'
}


Chirp({
  user: 'mr_ino', //Twitter username
  max: 5, //Maximum number of tweets to show
  count: 100, //Total tweets to retrieve
  retweets: true, //Show/Don't show retweets
  replies: false,  //Show/Don't show replies
  target: "twitter-content", //Target the id "twitter"
  templates: twitterTemplate, // Use custom template
  cacheExpire: 1000 * 60 * 60 //Number of milliseconds to cache tweets
})
