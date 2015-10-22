VERY RECENT PACKAGE

Simple legend control for leaflet. Calls a GetLegendGraphic url and displays it inside a leaflet control.

##Usage

First, create and add the control to the map:


    var options = {
        position:'topright'
    };

    var legendTitle = "My beautiful legend";

    var legendControl = L.control.legend(legendTitle, options);
    legendControl.addTo(map);


Construct the GetLegendGraphic url:

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


And finally, add this layer to the legend control:


    legendControl.AddLegendGraphic(legendUrl);


You can also remove that URL anytime to remove the image from the control:

    legendControl.RemoveLegendGraphic(legendUrl);

