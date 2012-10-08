//= require lib/jquery-1.8.2
//= require lib/l10n
//= require lib/flickr

var flickr = new Flickr();
flickr.showRandomPicture( onFlickrImage );

function onFlickrImage ( obj ){
	$('.background_image').css('background-image', 'url(' + obj.url + ')');
	$('.background_image').css('filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + obj.url + '", sizingMethod="scale")');
	$('.background-image').css('-ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + obj.url + '", sizingMethod="scale")');
	$('.background_image').css('background-repeat', 'no-repeat');
	$('.background_image').css('background-position', 'center center');
	$('.background_image').css('background-attachment', 'fixed');
}
