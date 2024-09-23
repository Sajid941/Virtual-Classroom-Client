import { useState } from "react";
import Drawer from "../../Components/Drawer/Drawer";
import Navbar from "../../Components/Shared/Navbar";
import LeaderBoard from "../../Components/LeaderBoard/LeaderBoard";

const Dashboard = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const handleToggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }
    return (
        <>
            <nav>
                <Navbar handleToggleDrawer={handleToggleDrawer} />
            </nav>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mt-10">
                <aside className="">
                    <Drawer isDrawerOpen={isDrawerOpen} handleToggleDrawer={handleToggleDrawer} />
                </aside>
                <main className="col-span-3 border border-black ml-12">
                    <h1 className="text-center">Hello world</h1>

                </main>
                <aside>
                    <LeaderBoard />
                </aside>
            </div>
        </>
    );
};

export default Dashboard;