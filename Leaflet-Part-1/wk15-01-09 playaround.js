//Example 9 from Day 1



// A function to determine the marker size based on the population
function markerSize(population) {
    return Math.sqrt(population) * 50;
  }
  
  // An array that contains all the information needed to create city and state markers
  // Population Data Source: U.S. 2020 Decennial Census
  var locations = [
    {
      coordinates: [40.7128, -74.0059],
      state: {
        name: "New York State",
        population: 20201249
      },
      city: {
        name: "New York",
        population: 8804190
      }
    },
    {
      coordinates: [34.0522, -118.2437],
      state: {
        name: "California",
        population: 39538223
      },
      city: {
        name: "Lost Angeles",
        population: 3898747
      }
    },
    {
      coordinates: [41.8781, -87.6298],
      state: {
        name: "Illinois",
        population: 12812508
      },
      city: {
        name: "Chicago",
        population: 2746388
      }
    },
    {
      coordinates: [29.7604, -95.3698],
      state: {
        name: "Texas",
        population: 29145505
      },
      city: {
        name: "Houston",
        population: 2304580
      }
    },
    {
      coordinates: [41.2524, -95.9980],
      state: {
        name: "Nebraska",
        population: 1961504
      },
      city: {
        name: "Omaha",
        population: 486051
      }
    }
  ];
  
  // Define arrays to hold the created city and state markers.
  var cityMarkers = [];
  var stateMarkers = [];
  
  // Loop through locations, and create the city and state markers.
  for (var i = 0; i < locations.length; i++) {
    // Setting the marker radius for the state by passing population into the markerSize function
    stateMarkers.push(
      L.circle(locations[i].coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: "white",  
        radius: markerSize(locations[i].state.population)
      })
    );
  
    // Set the marker radius for the city by passing the population to the markerSize() function.
    cityMarkers.push(
      L.circle(locations[i].coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "purple",
        fillColor: "purple",
        radius: markerSize(locations[i].city.population)
      })
    );
  }
  
  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  
  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  
  // Create two separate layer groups: one for the city markers and another for the state markers.
  var states = L.layerGroup(stateMarkers);
  var cities = L.layerGroup(cityMarkers);
  
  // Create a baseMaps object.- tile layers
  // We can name the tiles in the key whateve we want Day 1 1:29/1:41  W
  var baseMaps = {
    "Street Map - Honey BooBoo": street,
    "Topographic Map": topo
  };
  
  // Create an overlay object. - marker groups
  // WLikewise, can name the ovrlay object in the key whateve we want Day 1 1:29/1:41  W
  var overlayMaps = {
    "State Population - Skiddle-de-doo": states,
    "City Population": cities
  };
  
  // Define a map object. - We tell the map what we want it to start off with
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [street, states, cities] // tile layers followed by any marker layers
  });
  
  // Pass our map layers to our layer control.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {     //dictionary of markers and tiles
    collapsed: false
  }).addTo(myMap);
  