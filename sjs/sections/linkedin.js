var linkedin_feed = 'http://www.linkedin.com/in/jamestomasino'

$.when (
	$.ajax ( { type: 'GET',
		url: 'services/linkedin.php?u=' + linkedin_feed,
		dataType: 'html'
	})
).then( $.proxy(onLinkedInSuccess, this), $.proxy(onLinkedInFail, this) );

function onLinkedInSuccess ( o ){
	try {
		var searchContainer = document.createElement("div");
		searchContainer.innerHTML = o;
		var searchContent = searchContainer.getElementsByClassName('position');
	} catch (e) {
		// Parse errors count as fail
		onLinkedInFail();
		return;
	}

	var output = '';
	var title = '';
	var org = '';
	var period = '';
	for (var i = 0; i < Math.min(9, searchContent.length); ++i){
		try {
			title = searchContent[i].getElementsByClassName('title')[0].innerText;
			org = searchContent[i].getElementsByClassName('org')[0].innerHTML;
			period = searchContent[i].getElementsByClassName('period')[0].innerHTML;
			desc = searchContent[i].getElementsByClassName('description')[0].innerHTML;
			output += '<article>'
			output += '<span class="position-title">' + title + ' - ' + org + '</span>';
			output += '<div class="period">' + period + '</div>';
			output += '<section class="desc">' + desc + '</section>';
			output += '</article>';
		} catch (e) {}
	}

	// If no data found, count that as a failure
	if (output == '') {
		onLinkedInFail();
	} else {
		$('#linkedin-content').html(output);
	}
}

function onLinkedInFail ( e ) {
	$('#linkedin-content').hide();
}
