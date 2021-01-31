// Create a map object
var myMap = L.map("mapid", {
    center: [18.5994, -5.6731],
    zoom: 2.5
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
 
//Store API query variables with 10000 limit 
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson?";
var limit = "&$limit=100000";

//Assemble API query URL
var url = baseURL + limit;
console.log(url);


d3.json(url, function createMarkers(data) {
    
    var features = data.features;


    for (var i = 0; i<features.length; i++) {

        var earthquake_loc = features[i].geometry;

        // Conditional for depth colors
        var color = "";
        if (features[i].geometry.coordinates[2] > 90) {
            color = "rgb(255, 0, 0)";
        }
        else if (features[i].geometry.coordinates[2] > 70) {
            color = "rgb(255, 128, 0)";
        }
        else if (features[i].geometry.coordinates[2] > 50) {
            color = "rgb(255, 191, 0)";
        }
        else if (features[i].geometry.coordinates[2] > 30) {
            color = "rgb(191, 255,0)";
        }
        else if (features[i].geometry.coordinates[2] > 10) {
            color = "rgb(64, 255, 0)"
        }
        else {
            color = "rgb(0, 255, 64)"
        }

        L.circle([earthquake_loc.coordinates[1], earthquake_loc.coordinates[0]], {
            fillOpacity:0.7,
            color: "",
            fillColor: color,
            //adjust radius
            radius: features[i].properties.mag * 50000 
        })
        .bindPopup("<h1>Magnitude: " + features[i].properties.mag +"</h1> <hr> <h3> Location: " + features[i].properties.place + "</h3><hr><h3> Depth: "+ features[i].geometry.coordinates[2] + "</h3>")
        .addTo(myMap);
    };
    console.log(earthquake_loc.coordinates[1])


});



