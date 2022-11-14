

/// ------------------ calling data  ------------------------------------

// exercise 10 example
// Store our API endpoint as queryUrl.
//var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// data for all quakes the last 7 days
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});




/// ------------------ establishing a function that reads that data  BEGIN  ------------------------------------

function createFeatures(earthquakeData) {

  //Set Maker Size
  function MarkerSize(mag) {
    return Math.sqrt(mag) * 5
  }
  

  // Set Marker Color for a given depth
  function MarkerColor(feature) {
    let quake_depth = feature.geometry.coordinates[2];
    let q_color = "rgb(208,228,194)";
    if (quake_depth > 90) { q_color = "rgb(55,82,36)" } // "rgb(55,86,35)"
    else if (quake_depth > 70) { q_color = "rgb(82,122,54)" }//
    else if (quake_depth > 50) { q_color = "rgb(112,168,74)" }//
    else if (quake_depth > 30) { q_color = "rgb(150,195,119)" }//"rgb(198,224,180)"
    else if (quake_depth > 10) { q_color = "rgb(195,221,177)" }//
    return (q_color)
  }
  
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Time:${new Date(feature.properties.time)}<br>Magnitude:${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }

  // use a circle for a marker and then bring in size marker and color per the functions above
  function pointToLayer(feature, latlng) {
    return new L.CircleMarker(latlng,
      {
        radius: MarkerSize(feature.properties.mag),
        color: "black",
        fillColor: MarkerColor(feature),
        fillOpacity: 20,
        weight: 1
      }
    );
  } 


  
  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature
  });

  
  
  
  
  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

/// ------------------ establishing a function that reads that data END  ------------------------------------

function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  
  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  
  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  
  
  
  // Create a layer control. Top right corner of page
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

    // Create legend
    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += '<i style="background: #white"></i><span>&lt;10</span><br>';
      div.innerHTML += '<i style="background: #yellow"></i><span>10-30</span><br>';
      div.innerHTML += '<i style="background: #purple"></i><span>30-50</span><br>';
      div.innerHTML += '<i style="background: #green"></i><span>50-70</span><br>';
      div.innerHTML += '<i style="background: #blue"></i><span>70-90</span><br>';
      div.innerHTML += '<i style="background: #red"></i><span>&gt;90</span><br>';
      return div;
    };
  
    legend.addTo(myMap);

}
