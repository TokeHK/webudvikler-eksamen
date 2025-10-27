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
      className={`px-3 py-2 rounded hover:bg-blue-100 transition ${
      pathname === to ? "text-blue-600 font-semibold border-2" : "text-gray-700"}`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white shadow p-4 flex gap-4">
      {links.filter((link) => link.showInNavbar !== false && link.link !== "*").map((link) =>
        navLink(link.link === "" ? "/" : `/${link.link}`, link.title)
      )}
    </nav>
  );
}
