import React from "react";
import "./App.css";
import LeafletMap from "./components/LeafletMap.js";
import { coffeeData } from "./coffee-data";

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

export function handleMenuClick(){
   const menu = document.getElementById('menu');
   const map = document.getElementById('map');
   const menuIcon = document.getElementById('menuIcon');
   menu.classList.contains('active') ? menu.classList.remove('active') : menu.classList.add('active');
   map.classList.contains('inactive') ? map.classList.remove('inactive') : map.classList.add('inactive');
   menuIcon.classList.contains('fa-bars') ? menuIcon.classList.remove('fa-bars') : menuIcon.classList.add('fa-bars');
   menuIcon.classList.contains('fa-xmark') ? menuIcon.classList.remove('fa-xmark') : menuIcon.classList.add('fa-xmark');
};

export default App;
