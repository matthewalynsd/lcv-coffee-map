import React, { useEffect, useRef } from "react";
import { coffeeData } from "../coffee-data";
import L from "leaflet";

export default function LeafletMap() {
  const map = useRef(null);
  
  useEffect(() => {
    map.current = L.map("map").setView([46.406329, -117.038663], 14);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        minZoom: 13,
        id: "mapbox/dark-v10",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoibWF0dGhld2FseW5kIiwiYSI6ImNqdnNvcWQ3cDM4MWY0M3FvdGc1YnF2OXAifQ.1GIr-xDXI-8SPEuZMVB_ug",
      }
    ).addTo(map.current);
    
//     Disable until if statement is created
//     map.current.locate({
//       setView: true
//     });
    
    map.current.on('locationfound', handleOnLocationFound);
    
    function handleOnLocationFound(event)
    {
      console.log('Working');
      const latlng = event.latlng;
      const radius = event.accuracy / 2;
      const userRadius = event.accuracy /10;
      const circle = L.circle(latlng, radius);
      const userCircle = L.circle(latlng, userRadius, {color: '#ffffff'});
      circle.addTo(map.current);
      userCircle.addTo(map.current);
    }
    
    coffeeData.forEach(function (coffeeDataItem) {
      const splitCoords = coffeeDataItem.latLong.split(", ");
      const lat = splitCoords[0];
      const lon = splitCoords[1];

      var defaultIcon = L.icon({
        iconUrl: "custom-icon.png",
        iconSize: [32, 32],
        tooltipAnchor: [1, -16],
        iconAnchor: [16, 30],
      });

      var hoverIcon = L.icon({
        iconUrl: "custom-icon-hover.png",
        iconSize: [32, 32],
        tooltipAnchor: [1, -16],
        iconAnchor: [16, 30],
      });

      var mapMarker = L.marker([lat, lon], { icon: defaultIcon }).addTo(
        map.current
      );
      mapMarker.bindTooltip(coffeeDataItem.title);

      mapMarker.on("mouseover", function (e) {
        mapMarker.setIcon(hoverIcon);
        mapMarker.openTooltip();
      });

      mapMarker.on("mouseout", function (e) {
        mapMarker.setIcon(defaultIcon);
        mapMarker.closeTooltip();
      });
    });
  }, []);

  return (
    <div id="map"></div>
  );
}
