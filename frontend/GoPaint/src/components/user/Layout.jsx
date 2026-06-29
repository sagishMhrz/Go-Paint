import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const { pathname } = useLocation();
  const forceScrolledHeader =
    pathname === "/colors" ||
    pathname === "/find-painters" ||
    pathname === "/how-it-works" ||
    pathname.startsWith("/hire-painter");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header forceScrolled={forceScrolledHeader} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
