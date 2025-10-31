import { Link, useLocation } from "react-router";
import { type AppRoute } from "../../RoutesConfig";

interface NavbarProps {
  links: AppRoute[];
}

/* 

Gå til RoutesConfig.tsx for at lave flere routes

*/

export default function Navbar({ links }: NavbarProps) {
  const { pathname } = useLocation();

  const navLink = (to: string, label: string) => (
    <Link key={to} to={to} 
      className={`nav_link ${
      pathname === to ? "nav_active" : ""}`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="nav">
      
      <Link to={""} className="nav_logo">
        ..news
      </Link>

      <div className="nav_link-container">
        {links.filter((link) => link.showInNavbar !== false && link.link !== "*").map((link) =>
          navLink(link.link === "" ? "/" : `/${link.link}`, link.title)
        )}
      </div>

      <input type="search" name="search" id="search" className="nav_search" placeholder="Søg på News"/>
    </nav>
  );
}
