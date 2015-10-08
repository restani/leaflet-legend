VERY RECENT PACKAGE

Simple legend control for leaflet. Heavily based on the choropleth demo at http://leafletjs.com/examples/choropleth.html

First, create and add the control to the map:


    var options = {
        position:'topright'
    };

    var legendTitle = "My beautiful legend";

    var legendControl = L.control.legend(legendTitle, options);
    legendControl.addTo(map);


Then load your layer, add it to the map and add a 'legend' property to its options:

    layer.options.legend = [{
        title: "Props", /* This is the title of the legend */
        showLegend: true, /* Whether the legend should be visible or not */
        style: { /* Object containing all style definitions */
            fields: ["myprop", "myotherprop"], /* Which feature properties will this styling use */
            expressions: [{ /* Expressions are evaluated. When true, the given styling is applied */
                name: "MyProp = MyOtherProp", /* Text that will be displayed on the legend control */
                expr: "{0} == {1}", /* Expression to evaluate  */
                style: { /* Leaflet styling to apply in case the expression is evaluated to true */
                    fillColor: "#FF0000",
                    fillOpacity: 1,
                    weight: 1
                },
                legendStyle: "background:#FF0000" /* Legend (css) styling to apply to the <i> object */
            }]
        }
    }];


(the style property is added as inline style to an \<i\> tag)

Finally, tell the control to watch that layer and display styles and legend for it:


    legendControl.AddLayer(layer)


You can define multiple styles and legends for a layer, that's why layer.options.legend is an array. Use the layer.options.selectedStyle to select a style in that array. Later, call legendControl.update() to update the legend and styles. 


Things are kinda working, but there is still a lot of work to do.
