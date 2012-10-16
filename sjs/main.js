//= require lib/jquery-1.8.2
//= require lib/handlebars-1.0.rc.1

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
	$('.maincontent').html('<section id="error" class="work"> <article> <header> <h1>There was an error loading the data.</h1> </header> </article> </section> ');
}
