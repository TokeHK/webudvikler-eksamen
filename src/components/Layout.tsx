import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { type AppRoute } from "../../RoutesConfig";

interface LayoutProps {
  links: AppRoute[];
}

const Layout = ({ links }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navbar links={links} />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
