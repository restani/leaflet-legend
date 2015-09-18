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
			this.div.innerHTML += "<h3>" + this.title + "</h3>";

			for (var s in this.layersSymbologies) {
				var legend = this.layersSymbologies[s];
				this.div.innerHTML += "<p><strong>" + legend.title + "</strong></p>";

				for (var i = 0 ; i < legend.Symbols.length ; ++i) {
					var symbology = legend.Symbols[i];
					this.div.innerHTML +=
						'<li style="list-style:none"><i style="' + symbology.Style + '" ></i>' +
						symbology.Name + "</li>";
				}
			}
		}
	});

	L.control.legend = function(layersSymbologies, options) {
		return new L.Control.Legend(layersSymbologies, options);
	};

})();