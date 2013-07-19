window.enquire2 = ( function( window, document, undefined ) {

	"use strict";

	var bool;
	var options = {
		'min-width': undefined,
		'max-width': undefined
	}

	return function(q){

		return matchMedia(q);

		//div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";

		//docElem.insertBefore( fakeBody, refNode );
		//bool = div.offsetWidth === 42;
		//docElem.removeChild( fakeBody );

		//return {
			//matches: bool,
			//media: q
		//};

	};

})( window, document );


