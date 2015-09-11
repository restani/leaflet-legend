VERY RECENT PACKAGE

Simple legend control for leaflet. Heavily based on the choropleth demo at http://leafletjs.com/examples/choropleth.html


Give it a dict specifying, for each desired legend, an inline style for each value:

	var symbology = {
		"<b>Heating system</b>": {
			"Oil":"background:#E60000",
			"Gas":"background:#FFAA00"
		},
		"<b>Recommended heating system</b>": {
			"District heating network":"background:#8400A8;opacity:0.4", 
		    "Water heatpump":"background:#894444;opacity:0.4", 
		    "Ground heatpump":"background:#4CE600;opacity:0.4"
		}
    };

    var options = {
    	position:'topright'
    };

	L.control.legend(symbology, options).addTo(map);


Things are kinda working, but this is far from a real plugin.
It could use dynamic adding/removing of layers, aliases, grabbing the legend from the service, and many more I'm sure.