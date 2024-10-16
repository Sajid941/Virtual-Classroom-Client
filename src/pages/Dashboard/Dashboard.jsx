import { useState } from "react";
import Drawer from "../../Components/Drawer/Drawer";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import NavDashboard from "../../Components/DashboardComponent/NavDashboard";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Navbar */}
      <NavDashboard handleToggleDrawer={handleToggleDrawer} />

      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row p-4 w-full justify-between container mx-auto gap-5 mt-24">
        
        {/* Drawer for mobile and tablet view */}
        <aside className="md:hidden">
          <Drawer isDrawerOpen={isDrawerOpen} handleToggleDrawer={handleToggleDrawer} />
        </aside>

        {/* Sidebar (visible on larger screens) */}
        <aside className="hidden md:block md:basis-2/12">
          <Drawer isDrawerOpen={isDrawerOpen} handleToggleDrawer={handleToggleDrawer} />
        </aside>

        {/* Main content area */}
        <main className="flex-grow md:flex-initial md:basis-6/12 z-40">
          <Outlet />
        </main>

        {/* Sidebar for extra content on larger screens */}
        <aside className="hidden xl:block xl:basis-3/12">
          <DashboardSidebar />
        </aside>
        <Toaster/>
      </div>
    </>
  );
};

export default Dashboard;
