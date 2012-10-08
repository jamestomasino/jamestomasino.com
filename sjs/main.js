//= require lib/jquery-1.8.2
//= require lib/handlebars-1.0.rc.1
//= require lib/l10n
//= require lib/flickr

var flickr = new Flickr();
flickr.showRandomPicture( onFlickrImage );

function onFlickrImage ( obj ){
	$('.flickr').css('background-image', 'url(' + obj.url + ')');
	$('.flickr').css('filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + obj.url + '", sizingMethod="scale")');
	$('.flickr').css('-ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + obj.url + '", sizingMethod="scale")');
	$('.flickr').css('background-repeat', 'no-repeat');
	$('.flickr').css('background-position', 'center center');
	$('.flickr').css('background-attachment', 'fixed');
}

window.console||(window.console={log:function(){}});

// Load Handlebars templates and json data
var sectionTemplatePath = 'templates/section.handlebars';
var dataPath = 'data/portfolio.json';

$.when (
	$.ajax ( sectionTemplatePath ),
	$.getJSON ( dataPath ),
	$(document).ready()
).then( onDataLoad, onDataFail );

function onDataLoad ( section, data ) {
	var sectionHTML = section[0];
	var sectionTemplate  = Handlebars.compile(sectionHTML);
	var jsonData = data[0];

	var html = $(sectionTemplate(jsonData));
	$('.maincontent').append(html);
}

function onDataFail ( error ) {
	$('.maincontent').html('<h1 class="error">There was an error loading site data.</h1>')
}
