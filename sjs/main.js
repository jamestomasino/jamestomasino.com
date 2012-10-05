// Example of library includes
//= require lib/modernizr
//= require lib/jquery-1.8.2
//= require lib/l10n
//= require lib/AppCacheMediator.class

var appCacheMediator = new AppCacheMediator();

/*

var setAPI = "http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=72157631261275342&per_page=500&page=1&api_key=c3c9b8e45305233bb97e431394dfb082&jsoncallback=?";
var data;
var totalImages = 0;
var remainingImages = 0;

function parseData ( json ) {
	data = json;
	remainingImages = totalImages = data.photoset.photo.length;
	$.each(data.photoset.photo.reverse(), parsePhoto );
}

function parsePhoto ( i, photo ) {
	var id = photo.id;
	var title = photo.title;
	title = title.replace ("'", "");
	title = title.replace ('"', '');
	var a_href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + photo.id + "/";
	$("<img class='lazy' src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' />").attr('id', "photo" + photo.id).appendTo("#images").wrap(("<a href='" + a_href + "' data-label='" + title + "'></a>"));
	var imageAPI = "http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&api_key=c3c9b8e45305233bb97e431394dfb082&photo_id=" + photo.id + "&jsoncallback=?";

	$.getJSON ( imageAPI, function ( json ) {
		var sizelist = json.sizes.size;
		var foundLarge = false;
		var photo = $('#photo' + id );

		var j = sizelist.length; while (j--) {

			if (sizelist[j].label == "Large" ) {
				foundLarge = true;
				var width = parseInt ( sizelist[j].width, 10 );
				var height = parseInt ( sizelist[j].height, 10 );
				var source = sizelist[j].source;

				if (photo)
				{
					photo.attr('width', width);
					photo.attr('height', height);
					if (width > height) {
						photo.addClass('wide');
					} else {
						photo.addClass('tall');
					}
					photo.attr('data-original', source);

					--remainingImages;
					updateCompletion();

					if (remainingImages < 1)
					{
						$('#loading').hide();
						$('#images').css('visibility', 'visible');
						$(".lazy").lazyload({
							effect : "fadeIn"
						});
					}
				}
				return;
			}

		}

		if (foundLarge === false) {
			// No Large Image, cleanup
			--remainingImages;
			updateCompletion();
			photo.remove();
		}

	});
}

function updateCompletion ( ) {
	var perc = String ( Math.round ( ( totalImages - remainingImages ) / totalImages * 100 ) );
	if (perc.length == 1) perc = '0' + perc;
	$('#perc').text(perc);
}

$(function() {

	$.getJSON( setAPI, parseData );

});

*/
