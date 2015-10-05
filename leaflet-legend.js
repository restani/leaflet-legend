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
			undefined,
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

			this.title = title;
		},

		onAdd: function(map) {
			var div = L.DomUtil.create('div', '');

			if (this.visibleLegendDiv == null)
				this.visibleLegendDiv = L.DomUtil.create('div', 'info legend', div);
			if (this.hiddenLegendDiv == null)
				this.hiddenLegendDiv = L.DomUtil.create('div', 'legend-show hidden', div);

			this._map = map;

			this.update();
			var me = this;

			map.on("layeradd", function(event) {
				me.update();
			});

			map.on("layerremove", function(event) {
				me.update();
			});

			return div;
		},

		update: function() {
			this._updateStyles();
			this._generateHtml();
		},

		_updateStyles: function() {
			this._map.eachLayer(function(layer) {
				if (layer.options && 'legend' in layer.options && layer.options.legend) {

					if(!("selectedStyle" in layer.options))
						layer.options.selectedStyle = 0;

					var styleFct = function(feature) {
						var style = layer.options.legend[layer.options.selectedStyle].style;

						var fieldValues = [];
						for (var i = 0; i < style.fields.length; ++i) {
							// TODO: check for existence of the field in the feature's properties
							fieldValues.push(feature.properties[style.fields[i]]);
						}

						for (var i = 0; i < style.expressions.length; ++i) {
							var exprObject = style.expressions[i];
							// We need to invoke the method with apply, because our format function
							// isn't prepared to accept arrays
							var formatted = "".format.apply(exprObject.expr, fieldValues);
							if (eval(formatted) === true) {
								return exprObject.style;
							}
						}
					}
					layer.setStyle(styleFct);
					layer.options.style = styleFct;
				}
			});
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

			this._map.eachLayer(function(layer) {
				if (!layer.options || !layer.options.legend) return;

				var options = layer.options;

				var legend = options.legend[options.selectedStyle || 0];

				if (!legend.showLegend) return;

				me.visibleLegendDiv.innerHTML += "<p><strong>" + legend.title + "</strong></p>";

				for (var i = 0; i < legend.style.expressions.length; ++i) {
					var symbology = legend.style.expressions[i];
					me.visibleLegendDiv.innerHTML +=
						'<li style="list-style:none"><i style="' + symbology.legendStyle + '" ></i>' +
						symbology.name + "</li>";
				}
			});

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