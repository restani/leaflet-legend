map = L.map('map').setView([46.100831, 7.07194], 2);

// Initialize the legend control (do this before adding layers to the map!)
var options = {
    position: 'topright'
};

var legendTitle = "My beautiful legend";

var legendControl = L.control.legend(legendTitle, options);
legendControl.addTo(map);

// Add a basemap, because that's nice
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

var url = "http://localhost:8080/geoserver/wms";

var legendGraphicOptions = {
    request:'GetLegendGraphic',
    version: '1.0.0',
    format: 'image/jpeg',
    layer: 'topp:states',
    style: '',
    legend_options: 'forceLabels:on'
};

var legendUrl = url + L.Util.getParamString(legendGraphicOptions);

legendControl.AddLegendGraphic(legendUrl);
console.log("Note: This throws an error because I don't have any live demo geoserver to query for the example.");
console.log("If you input a correct (running) geoserver url it works though...");