import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { type AppRoute } from "../../RoutesConfig";

interface LayoutProps {
  links: AppRoute[];
}

const Layout = ({ links }: LayoutProps) => {
  return (
    <div className="layout">
      <Navbar links={links} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
