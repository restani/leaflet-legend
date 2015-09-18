(function() {

	L.Control.Legend = L.Control.extend({

		initialize: function(title, options) {
			L.setOptions(this, options);

			this.title = title;
			this.layersSymbologies = {};
			this.div = null;
		},

		onAdd: function(map) {
			this.div = L.DomUtil.create('div', 'info legend');
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

			return this.div;
		},

		_generateHtml: function() {
			this.div.innerHTML = "";
			this.div.innerHTML += "<div class='leaflet-bar leaflet-control'><a href='#' title='Close legend' id='legend-close'>&times;</a></div>"
			this.div.innerHTML += "<h3>" + this.title + "</h3>";

			for (var s in this.layersSymbologies) {
				var legend = this.layersSymbologies[s];
				this.div.innerHTML += "<p><strong>" + legend.title + "</strong></p>";

				for (var i = 0; i < legend.symbols.length; ++i) {
					var symbology = legend.symbols[i];
					this.div.innerHTML +=
						'<li style="list-style:none"><i style="' + symbology.style + '" ></i>' +
						symbology.name + "</li>";
				}
			}

			this._prepareCloseToggle();
		},

		_prepareCloseToggle: function() {
			var me = this;
			
			var element = L.DomUtil.get("legend-close");
			if (element != null) {
				element.onclick = function() {
					// Toggle visibility
					if (L.DomUtil.hasClass(me.div, "legend-hide"))
						L.DomUtil.removeClass(me.div, "legend-hide");
					else
						L.DomUtil.addClass(me.div, "legend-hide");
				};
			}
		}
	});

	L.control.legend = function(legendTitle, options) {
		return new L.Control.Legend(legendTitle, options);
	};

})();