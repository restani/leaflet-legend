var map = L.map('map').setView([46.113327, 7.073485], 18);

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