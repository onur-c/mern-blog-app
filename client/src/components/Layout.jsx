import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <main>
      <Header />
      <div className="mx-12 mt-16">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
