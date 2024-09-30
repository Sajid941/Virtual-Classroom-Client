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
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10 pt-16 md:pt-28 px-5 md:px-10 lg:px-20">
        <aside className="">
          <Drawer
            isDrawerOpen={isDrawerOpen}
            handleToggleDrawer={handleToggleDrawer}
          />
        </aside>

        <main className="md:col-span-2 lg:col-span-2 xl:ml-0 md:ml-80  2xl:ml-2">
          <Outlet />
        </main>

        <aside className="hidden xl:block pr-10">
          <div className="fixed right-16 h-4/5 border rounded-lg bg-[#004085] text-white py-10 px-5 w-72">
            <DashboardSidebar />
          </div>
        </aside>
      </div>
    </>
  );
};

export default Dashboard;

