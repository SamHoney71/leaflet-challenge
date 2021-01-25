// Create a map object
var myMap = L.map("mapid", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
 
  
// Adding tile layer to map  
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);
 
//Store API query variables with 1000 limit 
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson?";
var limit = "&$limit=100";

//Assemble API query URL
var url = baseURL + limit;
console.log(url);

//Grab data with D3

d3.json(url, function(data) {
    // console.log(data);
    //console.log(data.features)
   
    // pull out 'features' in Json
    var features = data.features;
    // console.log(features)

    // Create marker cluster group
    var markers = L.markerClusterGroup();
    // console.log(markers)

    //loop through data
    for (var i = 0; i< features.length; i++) {

        //Set earthquake location to a variable
        var earthquake_loc = features[i].geometry;
            
        // // set variable for lat, long, depth
        // var lng = earthquake_loc.coordinates[0];
        // // console.log(lng);
        // var lat = earthquake_loc.coordinates[1];
        // // console.log(lat);
        // var depth = earthquake_loc.coordinates[2];
        // // console.log(depth);


        if (earthquake_loc) {
            markers.addLayer(L.marker([earthquake_loc.coordinates[1], earthquake_loc.coordinates[0]])
                .bindPopup(earthquake_loc.coordinates[2]));
        }
        
    }

//Add marker cluster layer to the map
myMap.addLayer(markers);

});
