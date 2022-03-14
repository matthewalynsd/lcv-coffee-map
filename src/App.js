import React, { useEffect, useRef } from "react";
import "./App.css";
import { coffeeData } from "./coffee-data";
import L from "leaflet";

function App() {
  return (
    <div className="container">
      <div id="menu">
        <h1>Coffee Tracker v1</h1>
        <MenuItems />
      </div>
      <LeafletMap />
    </div>
  );
}

function MenuItems() {
  return (
    <>
      {coffeeData.map(
        ({ title, address, latLong, driveThrough, dineIn, roaster }) => (
          <div key={title} className="menu-item">
            <h2>{title}</h2>
            <p>{address}</p>
            <div className="icon-row">
              {driveThrough && (
                <i className="fa-solid fa-car" title="Drive Through"></i>
              )}
              {dineIn && (
                <i className="fa-solid fa-utensils" title="Dine In"></i>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}

function handleMenuClick(){
   const menu = document.getElementById(‘menu’);
   const map = document.getElementById(‘map’);
   menu.hasClass(‘active’) ? menu.removeClass(‘active’) : menu.addClass(‘active’);
   map.hasClass(‘inactive’) ? map.removeClass(‘inactive’) : map.addClass(‘inactive’);
   menuIcon.hasClass(‘fa-bars’) ? menuIcon.removeClass(‘fa-bars’) : menuIcon.addClass(‘fa-bars’);
   menuIcon.hasClass(‘fa-xmark’) ? menuIcon.removeClass(‘fa-xmark’) : menuIcon.addClass(‘fa-xmark’);
};

export function LeafletMap() {
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
    <div id="map">
      <div className="menu-icon">
        <i className="fa fa-bars" onClick="handleMenuClick()"></i>
      </div>
      <button
        className="recenter-button"
        onClick={() => {
          map.current.setView([46.406329, -117.038663], 14);
        }}
      >
        Re-Center
      </button>
    </div>
  );
}

export default App;
