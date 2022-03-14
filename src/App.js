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
      <div className="menu-icon">
        <i className="fa fa-bars" onClick={handleMenuClick} id='menuIcon'></i>
      </div>
    </div>
  );
}

function MenuItem(props) {
  return (
    <div key={props.shopTitle} className="menu-item">
            <h2>{props.shopTitle}</h2>
            <p>{props.address}</p>
            <div className="icon-row">
              {props.driveThrough && (
                <i className="fa-solid fa-car" title="Drive Through"></i>
              )}
              {props.dineIn && (
                <i className="fa-solid fa-utensils" title="Dine In"></i>
              )}
            </div>
          </div>
  );
}

function MenuItems() {
  return (
    <>
      {coffeeData.map(
        ({ title, address, latLong, driveThrough, dineIn, roaster }) => (
          <MenuItem shopTitle={title} address={address} driveThrough={driveThrough} dineIn={dineIn} />
        )
      )}
    </>
  );
}

function handleMenuClick(){
   const menu = document.getElementById('menu');
   const map = document.getElementById('map');
   const menuIcon = document.getElementById('menuIcon');
   menu.classList.toggle('active');
   map.classList.toggle('inactive');
   menuIcon.classList.toggle('fa-bars');
   menuIcon.classList.toggle('fa-xmark');
};

export default App;
