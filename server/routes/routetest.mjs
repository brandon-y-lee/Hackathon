import fetch from 'node-fetch';
import polyline from '@mapbox/polyline';

const mapboxUrl = "https://api.mapbox.com/directions/v5/mapbox/driving-traffic/19.30063630556%2C52.1246099075455%3B15.3384118376873%2C49.7428590048094?alternatives=false&continue_straight=false&geometries=polyline6&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoiY2hlc3Rlcnp6IiwiYSI6ImNsajB3eWtzNDB6dHozZ251NHlsYnljMWoifQ.0zbv4IR2CSJU-nzqXtpGWw";

fetch(mapboxUrl)
  .then(response => response.json())
  .then(data => {
    let geometry = data.routes[0].geometry;
    let decodedGeometry = polyline.toGeoJSON(geometry);
    
    // Modify coordinates
    decodedGeometry.coordinates = decodedGeometry.coordinates.map(coord => coord.map(val => val * 0.1));
    
    // Use only the first two coordinates
    decodedGeometry.coordinates = decodedGeometry.coordinates.slice(0, 1);
    
    // Fetch weather data for each coordinate
    decodedGeometry.coordinates.forEach(coord => {
      let lat = coord[0];
      let lon = coord[1];
      console.log(lat,lon)
      
      const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=152114edb01994fefbeaf7398907bbb9`;
      
      fetch(weatherUrl)
        .then(response => response.json())
        .then(weatherData => {
          console.log(weatherData);
          console.log(JSON.stringify(weatherData));
        })
        .catch(error => console.error('Error:', error));
    });
  })
  .catch(error => console.error('Error:', error));
