import React from "react";
import { NavLink } from "react-router-dom";
import "./drawer.css"; 

export interface DrawerItem {
  id?: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface DrawerProps {
  items: DrawerItem[];
  title?: string;
}

export const Drawer: React.FC<DrawerProps> = ({ items, title = "Navigation" }) => {
  const getClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "active" : ""}`;

  return (
    <aside className="drawer">
      <h2 className="drawer-title">{title}</h2>
      <nav className="nav">
        {items.map((item) => (
          <NavLink key={item.path} to={item.path} className={getClass}>
            <span className="nav-item-content">
              {item.icon && <span className="nav-icon">{item.icon}</span>}
              <span className="nav-label">{item.label}</span>
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Drawer;
