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
        <i className="fa fa-bars" onClick={handleMenuClick} id="menuIcon"></i>
      </div>
    </div>
  );
}

// Individual menu item component, takes props from MenuItems component loop
const MenuItem = (props) => {
  const {
    item: { title, address, driveThrough, dineIn },
  } = props;
  return (
    <div key={title} className="menu-item">
      <h2>{title}</h2>
      <p>{address}</p>
      <div className="icon-row">
        {driveThrough && <i className="fa-solid fa-car" title="Drive Through"></i>}
        {dineIn && <i className="fa-solid fa-utensils" title="Dine In"></i>}
      </div>
    </div>
  );
};

// Sidebar/overlay menu of menu items, looped from coffeeData object (imported above)
function MenuItems() {
  return (
    <>
      {coffeeData.map((item) => (
        <MenuItem item={item} />
      ))}
    </>
  );
}

// Click handler for mobile menu toggle icon: if menu is closed => then open it and change icon class. If menu is opened => then close it and change icon class.
function handleMenuClick() {
  const menu = document.getElementById("menu");
  const map = document.getElementById("map");
  const menuIcon = document.getElementById("menuIcon");
  menu.classList.toggle("active");
  map.classList.toggle("inactive");
  menuIcon.classList.toggle("fa-bars");
  menuIcon.classList.toggle("fa-xmark");
}

export default App;