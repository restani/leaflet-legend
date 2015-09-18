var map = L.map('map').setView([46.100831,7.07194], 15);

// Display a basemap
var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

// Initialize and add the legend control
layer.legend = {
    title: "Layer-title",
    "Symbols": [{
        "Name": "Symbol1",
        "Style": "background:#E60000"
    }, {
        "Name": "Symbol 2",
        "Style": "background:#00AA00"
    }]
};

layer.addTo(map);

var options = {
    position:'topright'
};

var legendTitle = "My beautiful legend";

L.control.legend(legendTitle, options).addTo(map);