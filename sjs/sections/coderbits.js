(function(window, document, $, enquire) {
	"use strict";

	var graphTypes = ['Languages', 'Environments', 'Skills', 'Traits'];

	var Coderbits = function ( id ) {
		var self = this;
		self.el = $(id);

		if ( self.el.length ) {
			var username = self.el.attr('data-coderbits-username');
			var safeUsername = username.replace(/[(''){};!@@#%&*]/gi, '');

			$.when (
				$.ajax ( { type: 'GET',
					url: 'https://coderbits.com/' + safeUsername + '.json',
					dataType: 'jsonp',
					timeout: 6000
				})
			).then( function (data) {

				self.link = data.link;
				self.labels = [];
				self.vals = [];
				self.keys = [];

				for (var i = 0; i < graphTypes.length; ++i) {
					var toptype = "top_" + graphTypes[i].toLowerCase();
					var topvals = self._splitArrays( data[toptype], 'name', 'count');
					self.labels[i] = graphTypes[i].slice(0);
					self.keys[i] = self._prefixArray(topvals[0], ' %%');
					self.vals[i] = topvals[1].slice(0);
				}

				if (window.matchMedia) {
					enquire.register("screen and (max-width:597px)", {
						match : function() {
							self.buildCharts(1);
						}
					});

					enquire.register("screen and (min-width:598px) and (max-width:887px)", {
						match : function() {
							self.buildCharts(2);
						}
					});

					enquire.register("screen and (min-width:888px)", {
						match : function() {
							self.buildCharts(4);
						}
					});
				} else {
					self.buildCharts(4);
				}

			},

			function () {
				self.el.html(''); // clear the area on fail
				self.el.css('display', 'none'); // and hide it
			});
		}
	}

	var p = Coderbits.prototype;


	p.buildCharts = function (cols) {
		var self = this;
		self._drawPieCharts(self.labels, self.keys.slice(0), self.vals, cols);
	};


	p._createPie = function (r, x, y, radius, values, keys, colors) {
		var self = this;
		var pie = r.piechart(x, y, radius, values.slice(0), {
			colors: colors,
			legend: keys,
			legendpos: 'south',
			legendcolor: '#000',
			stroke: '#FFF8D3',
			strokewidth: '1'
		});

		pie.hover(function () {
			self._zoomPie(this);
		}, function () {
			self._unzoomPie(this);
		});
	};

	p._createPieLabel = function (r, x, y, value) {
		r.text(x, y, value).attr({
			font: '20px "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif'
		}).attr({ fill: '#47a' });
	};

	p._drawPieCharts = function (labels, keys, vals, cols) {
		var self = this;
		var colors = [
			'#2ba8cb',
			'#68b6cb',
			'#8bbdcb',
			'#b4cdd4',
			'#d9dedf'
		];
		var labelTop = 50;
		var chartTop = 160;
		var margin = 40;
		var radius = 75;
		var start = 90;
		var offset = (radius * 2) + margin;
		var yspacer = 330;

		if (self.paper) {
			self.paper.clear();
		} else {
			self.el.html('');
			self.paper = Raphael(self.el.attr('id'));
		}

		self.paper.canvas.removeAttribute('height');
		self.paper.canvas.removeAttribute('width');

		switch (cols) {
			case 1:
				start = 127;
				break;
			case 2:
				start = 170;
				break;
			case 3:
			case 4:
			default:
				start = 120;
				break;
		}
		for (var i = 0; i < self.labels.length; ++i ) {

			var yoffset = yspacer * ( Math.floor ( i / cols ) );

			self._createPieLabel(
				self.paper,
				start + ( offset * (i % cols) ),
				labelTop + yoffset,
				labels[i]
			);

			self._createPie(
				self.paper,
				start + ( offset * (i % cols) ),
				chartTop + yoffset,
				radius,
				vals[i],
				keys[i],
				colors
			);
		}
	};

	p._zoomPie = function (self) {
		self.sector.stop();
		self.sector.scale(1.1, 1.1, self.cx, self.cy);

		if (self.label) {
			self.label[0].stop();
			self.label[0].attr({ r: 7.5 });
			self.label[1].attr({ 'font-weight': 800 });
		}
	};

	p._unzoomPie = function (self) {
		self.sector.animate({
			transform: 's1 1 ' +
			self.cx +
			' ' +
			self.cy
		}, 500, 'bounce');

		if (self.label) {
			self.label[0].animate({ r: 5 }, 500, 'bounce');
			self.label[1].attr({ 'font-weight': 400 });
		}
	};

	p._splitArrays = function (data, firstElement, secondElement) {
		var first = [], second = [];
		for (var i = 0; i < data.length; i++) {
			first[i] = data[i][firstElement];
			second[i] = data[i][secondElement];
		}
		return { 0: first, 1: second };
	};

	p._prefixArray = function (data, prefix) {
		for (var i = 0; i < data.length; i++)
			data[i] = data[i] + prefix;
		return data;
	};

	window.Coderbits = Coderbits;

})(window, document, jQuery, enquire);
