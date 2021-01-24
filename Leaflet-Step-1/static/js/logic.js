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
var limit = "&$limit=1000";

//Assemble API query URL
var url = baseURL + limit;
console.log(url);

//Grab data with D3

d3.json(url, function(data) {

    // Create marker cluster group
    var markers = L.markerClusterGroup();

    //loop through data
    for (var i = 0; i< data.length; i++) {

        //Set earthquake location to a variable
        var earthquake_loc = data[i].features.geometry;

        if (earthquake_loc) {
            markers.addLayer(L.circle([earthquake_loc.coordinates[0], earthquake_loc.coordinates[1]])
                .bindPopup(data[i].features.property.mag));
        }
    }

    //Add marker cluster layer to the map

});
