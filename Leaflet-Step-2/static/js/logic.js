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
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson?";
var limit = "&$limit=10000";

//Assemble API query URL
var url = baseURL + limit;
console.log(url);

//Grab data with D3
d3.json(url, function(data) {
    // console.log(data);
   
    // pull out 'features' in Json
    var features = data.features;
    // console.log(features)

    // Create marker cluster group - need to get rid of clusters
    var markers = L.markerClusterGroup();
    // console.log(markers)

    //loop through data
    for (var i = 0; i< features.length; i++) {

        //Set earthquake location to a variable
        var earthquake_loc = features[i].geometry;
            
        // // set variable for lat, long, depth
        var lng = earthquake_loc.coordinates[0];
        // // console.log(lng);
        var lat = earthquake_loc.coordinates[1];
        // // console.log(lat);
        var depth = earthquake_loc.coordinates[2];
        console.log(depth);

        // variables for earthquake properties
        var earthquake_prop = features[i].properties;
        // console.log(earthquake_prop);
        var magnitude = earthquake_prop.mag;
        // console.log(magnitude)
        var place = earthquake_prop.place;
        // console.log(place)

        // Conditional for depth colors
        var color = "";
        if (earthquake_loc.coordinates[2] > 90) {
            color = "Red";
        }
        else if (earthquake_loc.coordinates[2] > 70) {
            color = "Orange";
        }
        else if (earthquake_loc.coordinates[2] > 50) {
            color = "red";
        }
        else if (earthquake_loc.coordinates[2] > 30) {
            color = "yellow";
        }
        else {
            color = "green;"
        }


        // Adds markers & pop ups
        if (earthquake_loc) {
            markers.addLayer(L.circle([earthquake_loc.coordinates[1], earthquake_loc.coordinates[0]], {
                fillOpacity:0.25,
                color: "white",
                fillColor: color,
                //adjust radius
                radius: earthquake_prop.mag * 1500
            }).bindPopup("<h1>Magnitude: " + magnitude +"</h1> <hr> <h3> Location: " + place + "</h3><hr><h3> Depth: "+ depth + "</h3>"));
        }
        
       
    }

//Add marker cluster layer to the map
myMap.addLayer(markers);
});
