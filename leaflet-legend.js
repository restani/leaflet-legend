(function() {

	// Tip found at http://stackoverflow.com/a/9090128
	function transitionEndEventName () {
	    var i,
	        undefined,
	        el = document.createElement('div'),
	        transitions = {
	            'transition':'transitionend',
	            'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
	            'MozTransition':'transitionend',
	            'WebkitTransition':'webkitTransitionEnd'
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

			this.title = title;
			this.layersSymbologies = {};
		},

		onAdd: function(map) {
			var div = L.DomUtil.create('div', '');
			this.visibleLegendDiv = L.DomUtil.create('div', 'info legend', div);
			this.hiddenLegendDiv =  L.DomUtil.create('div', 'legend-show hidden', div);

			this._generateHtml();
			var me = this;

			map.on("layeradd", function(event) {
				if ('legend' in event.layer && typeof event.layer.legend !== 'undefined') {
					me.layersSymbologies[event.layer._leaflet_id] = event.layer.legend;
				}

				me._generateHtml();
			});

			map.on("layerremove", function(event) {
				delete me.layersSymbologies[event.layer._leaflet_id];
				me._generateHtml();
			});

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
			this.visibleLegendDiv.addEventListener(transitionEnd, function(event) { return me._onTransitionEnd(event, me); }, false);

			for (var s in this.layersSymbologies) {
				var legend = this.layersSymbologies[s];
				this.visibleLegendDiv.innerHTML += "<p><strong>" + legend.title + "</strong></p>";

				for (var i = 0; i < legend.symbols.length; ++i) {
					var symbology = legend.symbols[i];
					this.visibleLegendDiv.innerHTML +=
						'<li style="list-style:none"><i style="' + symbology.style + '" ></i>' +
						symbology.name + "</li>";
				}
			}

			this._prepareHideButton();
			this._prepareShowButton();
		},

		_prepareHideButton: function() {
			var me = this;
			
			var element = L.DomUtil.get("legend-hide");
			if (element != null) {
				element.onclick = function() {
					// Hide div
					L.DomUtil.addClass(me.visibleLegendDiv, "legend-hide");
				};
			}
		},

		_prepareShowButton: function() {
			var me = this;
			
			var element = L.DomUtil.get("legend-show");
			if (element != null) {
				element.onclick = function() {
					// show div
					L.DomUtil.removeClass(me.visibleLegendDiv, "legend-hide");
					// Hide button
					L.DomUtil.addClass(me.hiddenLegendDiv, 'hidden');
				};
			}
		},

		_onTransitionEnd: function(event, me) {
			var isHidden = L.DomUtil.hasClass(event.target, 'legend-hide');
			if(isHidden) { // Legend is hidden. Activate the show button
				L.DomUtil.removeClass(me.hiddenLegendDiv, 'hidden');
			} else { // Legend is shown. Hide the show button

			}
		}
	});

	L.control.legend = function(legendTitle, options) {
		return new L.Control.Legend(legendTitle, options);
	};

})();