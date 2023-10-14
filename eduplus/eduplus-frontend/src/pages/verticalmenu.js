import React from "react";
import VerticalMenuItem from "./verticalmenuitem"; 

const VerticalMenu = ({ items, activeItem, onItemClick }) => {
  return (
    <div className="vertical-menu">
      <ul>
        {items.map((item) => (
          <VerticalMenuItem
            key={item.id}
            label={item.label}
            onClick={() => onItemClick(item.id)}
            isActive={activeItem === item.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default VerticalMenu;
