VERY RECENT PACKAGE

Simple legend control for leaflet. Heavily based on the choropleth demo at http://leafletjs.com/examples/choropleth.html

Before adding a layer to the map, give it a 'legend' property, containing a dict of the following format:
The style property is added as inline style to an \<i\> tag.


First, create and add the control to the map:


    var options = {
        position:'topright'
    };

    var legendTitle = "My beautiful legend";

    L.control.legend(legendTitle, options).addTo(map);


Then, add a 'legend' property to each layer that needs to have an associated legend:


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


And that's all. When you add/remove layers to the map, the legend should update to show or hide accordingly.


Things are kinda working, but there is still a lot of work to do.