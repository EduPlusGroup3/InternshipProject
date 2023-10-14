import React from "react";

const VerticalMenuItem = ({ label, onClick, isActive }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick();
  };

  return (
    <li>
      <a href="/" onClick={handleClick} className={`vertical-menu-item ${isActive ? "active" : ""}`}>
        {label}
      </a>
    </li>
  );
};


export default VerticalMenuItem;
