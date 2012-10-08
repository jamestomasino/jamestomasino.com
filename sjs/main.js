//= require lib/modernizr
//= require lib/jquery-1.8.2
//= require lib/l10n
//= require lib/appcache
//= require flickr

var appCacheMediator = new AppCacheMediator();
var flickr = new Flickr();
flickr.showRandomPicture( onFlickrImage );

function onFlickrImage ( obj ){
	$('.background_image').css('background-image', 'url(' + obj.url + ')');
	$('.background_image').css('background-repeat', 'no-repeat');
	$('.background_image').css('background-position', 'center center');
	$('.background_image').css('background-attachment', 'fixed');
}
