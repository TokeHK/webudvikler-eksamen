import { Outlet } from "react-router";
import AdminNavbar from "./AdminNavbar";
import { type AppRoute } from "../../RoutesConfig";

interface AdminLayoutProps {
  links: AppRoute[];
}

const AdminLayout = ({ links }: AdminLayoutProps) => {
  return (
    <div>
      <AdminNavbar links={links} />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
