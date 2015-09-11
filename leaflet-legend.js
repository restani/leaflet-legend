(function() {

L.Control.Legend = L.Control.extend({

	initialize: function (layersSymbologies, options) {
		L.setOptions(this, options);
		
		this.layersSymbologies = layersSymbologies;
	},

	onAdd: function (map) {
	    var div = L.DomUtil.create('div', 'info legend')

	    for(var s in this.layersSymbologies) {
	    	div.innerHTML += "<div>";
		    div.innerHTML += "<p>" + s + "</p>";

		    var symbology = this.layersSymbologies[s];
		    for (var symbol in symbology) {
		        div.innerHTML +=
		            '<li style="list-style:none"><i style="' + symbology[symbol] + '" ></i>' +
		            symbol + "</li>";
		    }
		    div.innerHTML += "</div>";
		}

		return div;
	}
});

L.control.legend = function (layersSymbologies, options) {
    return new L.Control.Legend(layersSymbologies, options);
};

})();