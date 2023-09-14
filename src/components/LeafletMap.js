import React, { useEffect, useRef } from "react";
import { coffeeData } from "../coffee-data";
import L from "leaflet";

export default function LeafletMap() {
  // useRef to target map instance
  const map = useRef(null);
  useEffect(() => {
    map.current = L.map("map").setView([46.192995, -115.986976], 14);
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
    //Locate current user on page load
    map.current.locate();
    //Fire event on location found
    map.current.on('locationfound', handleOnLocationFound);

    //Add circle shape to user's location on map
    function handleOnLocationFound(event)
    {
      const radius = event.accuracy / 2;
      const userRadius = event.accuracy /10;
      const latlng = event.latlng;
      
      var userLoc = L.circle(latlng, userRadius);
      var circle = L.circle(latlng, radius);
      userLoc.addTo(map.current);
      circle.addTo(map.current);
    }
    
    //Add map markers per coffeeData object item
    coffeeData.forEach(function (coffeeDataItem) {
      //object coords are in standard decimal format, need to be split by comma
      const splitCoords = coffeeDataItem.latLong.split(", ");
      //lat and long are assigned from split coordinates
      const lat = splitCoords[0];
      const lon = splitCoords[1];

      //custom icon set here, the default icon is an outdated blue
      var defaultIcon = L.icon({
        iconUrl: "custom-icon.png",
        iconSize: [32, 32],
        tooltipAnchor: [1, -16],
        iconAnchor: [16, 30],
      });
      
      //custom icon hover state set here
      var hoverIcon = L.icon({
        iconUrl: "custom-icon-hover.png",
        iconSize: [32, 32],
        tooltipAnchor: [1, -16],
        iconAnchor: [16, 30],
      });

      //add markers to map instance, using custom icon
      var mapMarker = L.marker([lat, lon], { icon: defaultIcon }).addTo(
        map.current
      );
      //bind the title to a tooltip
      mapMarker.bindTooltip(coffeeDataItem.title);

      //on hover, show the tooltip
      mapMarker.on("mouseover", function (e) {
        mapMarker.setIcon(hoverIcon);
        mapMarker.openTooltip();
      });

      //close on mouseout
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
