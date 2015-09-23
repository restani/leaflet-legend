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


Then load your layer, but don't add it to the map yet. You first need to add a 'legend' property to it:


    layer.legend = {
        title: "Props", /* This is the title of the legend */
        "style": { /* Object containing all style definitions */
            "fields": ["myprop", "myotherprop"], /* Which feature properties will this styling use */
            "expressions": [{ /* Expressions are evaluated. When true, the given styling is applied */
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
    };


Then add your layer to the map. Next, when you add/remove layers to the map, the legend should update to show or hide accordingly.

Things are kinda working, but there is still a lot of work to do.