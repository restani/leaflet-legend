var map = L.map('map').setView([46.113327, 7.073485], 10);

// Display a basemap
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);


// Initialize and add the legend control
var symbology = {
    "<b>Layer 1</b>": {
        "Symbol A":"background:#E60000",
        "Symbol B":"background:#FFAA00"
    },
    "<b>Layer 2</b>": {
        "Semi transparent symbol A":"background:#8400A8;opacity:0.4", 
        "Semi transparent symbol B":"background:#894444;opacity:0.4", 
        "Semi transparent symbol C":"background:#4CE600;opacity:0.4"
    }
};

var options = {
    position:'topright'
};

L.control.legend(symbology, options).addTo(map);