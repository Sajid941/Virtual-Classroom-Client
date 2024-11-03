import { useState } from "react";
import Drawer from "../../Components/Drawer/Drawer";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import { Toaster } from "react-hot-toast";
import NavDashboard from "../../Components/DashboardComponent/NavDashboard";

const Dashboard = () => {
  const [isShowDrawer, setIsShowDrawer] = useState(false);

  const handleToggleDrawer = () => {
    setIsShowDrawer(!isShowDrawer);
  };

  return (
    <>
      <div className="md:px-10 lg:px-20">
        {/* Navbar */}
        <nav className="z-50">
          <NavDashboard handleToggleDrawer={handleToggleDrawer} />
        </nav>
        {/* Responsive Layout */}
        <div className="flex flex-col md:flex-row w-full justify-between container mx-auto gap-5 mt-24">
          {/* Drawer for mobile and tablet view */}
          <aside className="md:hidden w-64 z-50">
            <Drawer
              isShowDrawer={isShowDrawer}
              handleToggleDrawer={handleToggleDrawer}
            />
          </aside>

          {/* Sidebar (visible on larger screens) */}
          <aside className="hidden md:block md:basis-2/12 z-40">
            <Drawer
              isShowDrawer={isShowDrawer}
              handleToggleDrawer={handleToggleDrawer}
            />
          </aside>

          {/* Main content area */}
          <main className="flex-grow md:flex-initial md:basis-7/12">
            <Outlet />
          </main>

          {/* Sidebar for extra content on larger screens */}
          <aside className="hidden xl:block xl:basis-3/12">
            <DashboardSidebar />
          </aside>
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
