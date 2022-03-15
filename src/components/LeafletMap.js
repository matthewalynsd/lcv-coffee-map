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

    function detectMob() {
      return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
    }
    if(detectMob() === false){
      map.current.locate();
    }
    map.current.on('locationfound', handleOnLocationFound);

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

    // L.DomEvent.addListener(L.DomUtil.get('locateButton'), 'click', function () {
    //   handleLocateClick();
    // });
    function handleLocateClick()
    {
      map.current.locate({setView:true});
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
