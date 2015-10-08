// First, define some GeoJSON features (or any kind of feature, really)
var geojsonObject = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {
            "stroke": "#555555",
            "stroke-width": 2,
            "stroke-opacity": 1,
            "fill": "#555555",
            "fill-opacity": 0.5,
            "myprop": 2,
            "myotherprop": 1
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        43.9453125,
                        63.860035895395306
                    ],
                    [
                        47.109375,
                        70.25945200030641
                    ],
                    [
                        68.5546875,
                        70.1403642720717
                    ],
                    [
                        65.0390625,
                        64.01449619484472
                    ],
                    [
                        43.9453125,
                        63.860035895395306
                    ]
                ]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "stroke": "#555555",
            "stroke-width": 2,
            "stroke-opacity": 1,
            "fill": "#555555",
            "fill-opacity": 0.5,
            "myprop": 4,
            "myotherprop": 1
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        51.328125,
                        40.44694705960048
                    ],
                    [
                        51.328125,
                        50.958426723359935
                    ],
                    [
                        70.3125,
                        50.958426723359935
                    ],
                    [
                        70.3125,
                        40.44694705960048
                    ],
                    [
                        51.328125,
                        40.44694705960048
                    ]
                ]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "stroke": "#555555",
            "stroke-width": 2,
            "stroke-opacity": 1,
            "fill": "#555555",
            "fill-opacity": 0.5,
            "myprop": 1,
            "myotherprop": 1
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-11.6015625,
                        35.460669951495305
                    ],
                    [-11.6015625,
                        48.45835188280866
                    ],
                    [
                        13.0078125,
                        48.45835188280866
                    ],
                    [
                        13.0078125,
                        35.460669951495305
                    ],
                    [-11.6015625,
                        35.460669951495305
                    ]
                ]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "stroke": "#555555",
            "stroke-width": 2,
            "stroke-opacity": 1,
            "fill": "#555555",
            "fill-opacity": 0.5,
            "myprop": 2,
            "myotherprop": 1
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-12.3046875,
                        61.270232790000634
                    ],
                    [-12.3046875,
                        68.39918004344189
                    ],
                    [
                        6.328125,
                        68.39918004344189
                    ],
                    [
                        6.328125,
                        61.270232790000634
                    ],
                    [-12.3046875,
                        61.270232790000634
                    ]
                ]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "stroke": "#555555",
            "stroke-width": 2,
            "stroke-opacity": 1,
            "fill": "#555555",
            "fill-opacity": 0.5,
            "myprop": 1,
            "myotherprop": 1
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        31.640625,
                        73.22669969306126
                    ],
                    [
                        15.468749999999998,
                        75.05035357407698
                    ],
                    [
                        32.6953125,
                        77.38950400539731
                    ],
                    [
                        53.0859375,
                        76.9206135182968
                    ],
                    [
                        46.7578125,
                        72.39570570653261
                    ],
                    [
                        31.640625,
                        73.22669969306126
                    ]
                ]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "stroke": "#555555",
            "stroke-width": 2,
            "stroke-opacity": 1,
            "fill": "#555555",
            "fill-opacity": 0.5,
            "myprop": 3,
            "myotherprop": 1
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        93.515625,
                        53.12040528310657
                    ],
                    [
                        86.1328125,
                        61.270232790000634
                    ],
                    [
                        107.22656249999999,
                        63.860035895395306
                    ],
                    [
                        118.47656249999999,
                        56.75272287205736
                    ],
                    [
                        108.28125,
                        42.293564192170095
                    ],
                    [
                        93.515625,
                        53.12040528310657
                    ]
                ]
            ]
        }
    }]
};

var legendJson = [{
    title: "Feature properties",
    showLegend: true,
    style: {
        fields: ["myprop", "myotherprop"],
        expressions: [{
            name: "MyProp = MyOtherProp",
            expr: "{0} == {1}",
            style: {
                fillColor: "#000000",
                fillOpacity: 1,
                weight: 1
            },
            legendStyle: "background:#000000"
        }, {
            name: "MyProp < 3",
            expr: "{0} < 3",
            style: {
                fillColor: "#FF0000",
                fillOpacity: 1,
                weight: 1
            },
            legendStyle: "background:#FF0000"
        }, {
            name: "MyProp = 3",
            expr: "{0} == 3",
            style: {
                fillColor: "#00FF00",
                fillOpacity: 1,
                weight: 1
            },
            legendStyle: "background:#00FF00"
        }, {
            name: "MyProp > 3",
            expr: "{0} > 3",
            style: {
                fillColor: "#0000FF",
                fillOpacity: 1,
                weight: 1
            },
            legendStyle: "background:#0000FF"
        }]
    },
}, {
    title: "Other legend",
    showLegend: true,
    style: {
        fields: ["myprop", "myotherprop"],
        expressions: [{
            name: "MyProp = MyOtherProp",
            expr: "{0} == {1}",
            style: {
                fillColor: "#FF0000",
                fillOpacity: 1,
                weight: 1
            },
            legendStyle: "background:#FF0000"
        }, {
            name: "MyProp < 3",
            expr: "{0} < 3",
            style: {
                fillColor: "#FFFF00",
                fillOpacity: 1,
                weight: 1
            },
            legendStyle: "background:#FFFF00"
        }, {
            name: "MyProp = 3",
            expr: "{0} == 3",
            style: {
                fillColor: "#00FFFF",
                fillOpacity: 1,
                weight: 1
            },
            legendStyle: "background:#00FFFF"
        }, {
            name: "MyProp > 3",
            expr: "{0} > 3",
            style: {
                fillColor: "#FF00FF",
                fillOpacity: 1,
                weight: 1
            },
            legendStyle: "background:#FF00FF"
        }]
    }
}];


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


// Adding a new layer
var layer = L.geoJson(geojsonObject).addTo(map);

// Associate a legend with the data
layer.options.legend = legendJson;

// Then tell the legendControl to apply symbology to this layer
legendControl.AddLayer(layer);


// Also, bind the control to the style switching button. 
// When clicked, it switches the style and legend from one to the other
var switchButton = L.DomUtil.get("switchStyleButton");
L.DomEvent.addListener(switchButton, "click", function() { 
    if(layer.options.selectedStyle === 0)
        layer.options.selectedStyle = 1;
    else
        layer.options.selectedStyle = 0;

    // update() updates the legend and the styles
    legendControl.update();
});