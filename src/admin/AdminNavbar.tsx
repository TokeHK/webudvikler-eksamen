import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import { type AppRoute } from "../../RoutesConfig";

interface AdminNavbarProps {
  links: AppRoute[];
}

/* 

Gå til RoutesConfig.tsx for at lave flere routes

*/

export default function AdminNavbar({ links }: AdminNavbarProps) {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navLink = (to: string, label: string) => (
    <Link key={to} to={to}
      className={`px-3 py-2 rounded hover:bg-green-100 transition ${
      pathname === to ? "text-green-700 font-semibold border-2" : "text-gray-700"}`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="flex gap-4 p-4 bg-white shadow">
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="px-3 py-2 transition rounded cursor-pointer hover:bg-blue-300"
      >
        Logout
      </button>
      {links.map((link) =>
        navLink(`/admin/${link.link}`, link.title)
      )}
    </nav>
  );
}
