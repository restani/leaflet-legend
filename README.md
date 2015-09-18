VERY RECENT PACKAGE

Simple legend control for leaflet. Heavily based on the choropleth demo at http://leafletjs.com/examples/choropleth.html

Before adding a layer to the map, give it a 'legend' property, containing a dict of the following format:
The style property is added as inline style to an <i> tag.

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

Then create and add the control to the map:

var options = {
    position:'topright'
};

var legendTitle = "My beautiful legend";

L.control.legend(legendTitle, options).addTo(map);




Things are kinda working, but there is still a lot of work to do.