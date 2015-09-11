VERY RECENT PACKAGE

Simple legend control for leaflet. Heavily based on the choropleth demo at http://leafletjs.com/examples/choropleth.html
Give it a dict specifying, for each desired legend, an inline style for each value:

	L.control.legend(
		{
			"<b>Heating system</b>":{
				"Oil":"background:#E60000",
				"Gas":"background:#FFAA00"
			},
			"<b>Recommended heating system</b>": {
				"District heating network":"background:#8400A8;opacity:0.4", 
			    "Water heatpump":"background:#894444;opacity:0.4", 
			    "Ground heatpump":"background:#4CE600;opacity:0.4"
			}
	    },
		{position:'topright'}).addTo(map);


