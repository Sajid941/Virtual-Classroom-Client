import { useState } from "react";
import Drawer from "../../Components/Drawer/Drawer";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import NavDashboard from "../../Components/DashboardComponent/NavDashboard";

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <>
      <NavDashboard handleToggleDrawer={handleToggleDrawer} />
      <div className="flex w-full justify-center gap-1">
        <aside className="">
          <Drawer
            isDrawerOpen={isDrawerOpen}
            handleToggleDrawer={handleToggleDrawer}
          />
        </aside>

        <main className="">
          <Outlet />
        </main>

        <aside className="hidden xl:block">
          <div className="">
            <DashboardSidebar />
          </div>
        </aside>
      </div>
    </>
  );
};

export default Dashboard;
