import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-row h-full">
      <nav className="flex flex-col items-center justify-between bg-green-500 w-1/6 h-screen pt-10">
        <Navbar />
      </nav>
      <main className="flex flex-col items-center w-full">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Layout;
