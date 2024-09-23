import { useState } from "react";
import Drawer from "../../Components/Drawer/Drawer";
import Navbar from "../../Components/Shared/Navbar";
import LeaderBoard from "../../Components/LeaderBoard/LeaderBoard";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const handleToggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }
    return (
        <>
            <nav className="fixed z-50 w-full backdrop-blur-md bg-opacity-30 bg-white/10">
                <Navbar handleToggleDrawer={handleToggleDrawer} />
            </nav>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pt-28 px-5 md:px-10 lg:px-20">
                <aside className="">
                    <Drawer isDrawerOpen={isDrawerOpen} handleToggleDrawer={handleToggleDrawer} />
                </aside>
                <main className="md:col-span-2 lg:col-span-2 border border-black md:ml-80 lg:ml-28 xl:ml-16 2xl:ml-2 ">
                    <Outlet />
                </main>
                <aside className="hidden lg:block ml-10">
                    <LeaderBoard />
                </aside>
            </div>
        </>
    );
};

export default Dashboard;