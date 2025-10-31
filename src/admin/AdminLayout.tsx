import { Outlet } from "react-router";
import AdminNavbar from "./AdminNavbar";
import { type AppRoute } from "../../RoutesConfig";

interface AdminLayoutProps {
  links: AppRoute[];
}

const AdminLayout = ({ links }: AdminLayoutProps) => {

  return (
    <div>
      <header>
        <AdminNavbar links={links} />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;