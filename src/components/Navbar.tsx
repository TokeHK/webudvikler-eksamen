import { Link, useLocation } from "react-router";
import { type AppRoute } from "../../RoutesConfig";
import { useState } from "react";

interface NavbarProps {
  links: AppRoute[];
}

/* 

Gå til RoutesConfig.tsx for at lave flere routes

*/

export default function Navbar({ links }: NavbarProps) {
  const { pathname } = useLocation();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const navLink = (to: string, label: string) => (
    <Link key={to} to={to} 
      className={`nav_link ${
      pathname === to ? "nav_active" : ""}`}
      onClick={() => setIsBurgerOpen(false)}
    >
      {label}
    </Link>
  );

  const toggleBurger = () => setIsBurgerOpen(prev => !prev);

  return (
    <nav className="nav">

      <Link to={""} className="nav_logo" onClick={() => setIsBurgerOpen(false)}>
        ..news
      </Link>

      <div className={`nav_burger-container`}>
        <div className="nav_burger" onClick={toggleBurger}>
          {isBurgerOpen ? (
          <span className="burger-close">X</span>
        ) : (
          <span className="burger-icon">☰</span>
        )}
        </div>
        <div className={`nav_link-container ${isBurgerOpen ? 'burger_open' : ''}`}>
          {links.filter((link) => link.showInNavbar !== false && link.link !== "*").map((link) =>
            navLink(link.link === "" ? "/" : `/${link.link}`, link.title)
            
          )}
        
        </div>
        <input type="search" name="search" id="search" className={`nav_search ${isBurgerOpen ? 'burger_open' : ''}`} placeholder="Søg på News"/>
      </div>

    </nav>
  );
}
