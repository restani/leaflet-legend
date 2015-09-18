var map = L.map('map').setView([46.100831,7.07194], 15);

// Initialize the legend control (do this before adding layers to the map!)
var options = {
    position:'topright'
};

var legendTitle = "My beautiful legend";

L.control.legend(legendTitle, options).addTo(map);


// Add a basemap, because that's nice
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

// Adding a new layer, with a legend associated
var layer = L.marker([46.100831,7.07194]);

layer.legend = {
    title: "Layer-title",
    "Symbols": [{
        "Name": "Symbol 1",
        "Style": "background:#E60000"
    }, {
        "Name": "Symbol 2",
        "Style": "background:#00AA00"
    }]
};

// Finally, add the layer to the map
layer.addTo(map);
