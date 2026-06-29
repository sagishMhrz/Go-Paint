import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F3F4F6]">
      <Header />
      <main className="flex-1 pt-[4.25rem]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
