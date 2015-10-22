(function() {

	// Add the String.format() method. Taken from somewhere on the net.
	(function() { // First, checks if it isn't implemented yet.
		if (!String.prototype.format) {
			String.prototype.format = function() {
				var args = arguments;
				return this.replace(/{(\d+)}/g, function(match, number) {
					return typeof args[number] != 'undefined' ? args[number] : match;
				});
			};
		}

	})();


	// Tip found at http://stackoverflow.com/a/9090128
	function transitionEndEventName() {
		var i,
			el = document.createElement('div'),
			transitions = {
				'transition': 'transitionend',
				'OTransition': 'otransitionend', // oTransitionEnd in very old Opera
				'MozTransition': 'transitionend',
				'WebkitTransition': 'webkitTransitionEnd'
			};

		for (i in transitions) {
			if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
				return transitions[i];
			}
		}

		//TODO: throw 'TransitionEnd event is not supported in this browser'; 
	}

	L.Control.Legend = L.Control.extend({

		initialize: function(title, options) {
			L.setOptions(this, options);

			this.hiddenLegendDiv = null;
			this.visibleLegendDiv = null;

			this.title = title;
			this._legendGraphicUrls = [];
		},

		AddLegendGraphic: function(legendGraphicUrl) {
			this._legendGraphicUrls.push(legendGraphicUrl);
			this._generateHtml();
		},

		RemoveLegendGraphic: function(legendGraphicUrl) {
			var index = this._legendGraphicUrls.indexOf(legendGraphicUrl);
			this._legendGraphicUrls.splice(index, 1);
			this._generateHtml();
		},

		onAdd: function(map) {
			var div = L.DomUtil.create('div', '');

			if (this.visibleLegendDiv === null)
				this.visibleLegendDiv = L.DomUtil.create('div', 'info legend', div);
			if (this.hiddenLegendDiv === null)
				this.hiddenLegendDiv = L.DomUtil.create('div', 'legend-show hidden', div);

			this._map = map;

			return div;
		},

		_generateHtml: function() {
			// show button
			this.hiddenLegendDiv.innerHTML = "";
			this.hiddenLegendDiv.innerHTML += "<div class='leaflet-bar leaflet-control'><a href='#'  title='Show legend' id='legend-show'><i class='fa fa-caret-left'></i></a></div>";

			this.visibleLegendDiv.innerHTML = "";
			// hide button
			this.visibleLegendDiv.innerHTML += "<div class='leaflet-bar leaflet-control'><a href='#' title='Hide legend' id='legend-hide'><i class='fa fa-caret-right'></i></a></div>";
			this.visibleLegendDiv.innerHTML += "<h3>" + this.title + "</h3>";

			var transitionEnd = transitionEndEventName();
			var me = this;
			this.visibleLegendDiv.addEventListener(transitionEnd, function(event) {
				return me._onTransitionEnd(event, me);
			}, false);

			for (var i = 0 ; i < this._legendGraphicUrls.length ; ++i) {
				this.visibleLegendDiv.innerHTML += 
					'<p><img src="' + this._legendGraphicUrls[i] + '" alt="__legend__"/></p>';
			}

			this._prepareHideButton();
			this._prepareShowButton();
		},

		_prepareHideButton: function() {
			var me = this;

			var element = L.DomUtil.get("legend-hide");
			if (element !== null) {
				L.DomEvent.addListener(element, 'click', function(e) {
					// Hide div
					L.DomUtil.addClass(me.visibleLegendDiv, "legend-hide");

					L.DomEvent.stopPropagation(e);
				});

				L.DomEvent.addListener(element, 'mousedown', function(e) {
					L.DomEvent.stopPropagation(e);
				});
			}
		},

		_prepareShowButton: function() {
			var me = this;

			var element = L.DomUtil.get("legend-show");
			if (element !== null) {
				L.DomEvent.addListener(element, 'click', function(e) {
					// show div
					L.DomUtil.removeClass(me.visibleLegendDiv, "legend-hide");
					// Hide button
					L.DomUtil.addClass(me.hiddenLegendDiv, 'hidden');

					L.DomEvent.stopPropagation(e);
				});

				L.DomEvent.addListener(element, 'mousedown', function(e) {
					L.DomEvent.stopPropagation(e);
				});
			}
		},

		_onTransitionEnd: function(event, me) {
			var isHidden = L.DomUtil.hasClass(event.target, 'legend-hide');
			if (isHidden) { // Legend is hidden. Activate the show button
				L.DomUtil.removeClass(me.hiddenLegendDiv, 'hidden');
			} else { // Legend is shown. Hide the show button

			}
		}
	});

	L.control.legend = function(legendTitle, options) {
		return new L.Control.Legend(legendTitle, options);
	};

})();