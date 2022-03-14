import React, { useEffect, useRef } from "react";
import { coffeeData } from "../coffee-data";
import L from "leaflet";

export default function LeafletMap() {
  const map = useRef(null);

  function handleOnLocationFound(event)
  {
    const latlng = event.latlng;
    const radius = event.accuracy;
    const circle = L.circle(latlng, radius);
    circle.addTo(map.current);
  }
  useEffect(() => {
    map.current = L.map("map").setView([46.406329, -117.038663], 14);
    L.tileLayer(
@@ -26,14 +33,8 @@ export default function LeafletMap() {
      setView: true
    });

    function handleOnLocationFound(event)
    {
      const latlng = event.latlng;
      const radius = event.accuracy;
      const circle = L.circle(latlng, radius);
      circle.addTo(map.current);
    }
    map.current.on('locationFound', handleOnLocationFound);

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
