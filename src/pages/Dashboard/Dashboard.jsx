import { useState } from "react";
import Drawer from "../../Components/Drawer/Drawer";
import Navbar from "../../Components/Shared/Navbar";

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

            <div className="">
                <aside>
                    <Drawer isDrawerOpen={isDrawerOpen} handleToggleDrawer={handleToggleDrawer} />
                </aside>
                <main>
                    <h1 className="text-center">Hello world</h1>

                </main>
                <aside>
                    <h1 className="text-center">Hello world</h1>

                </aside>
            </div>
        </>
    );
};

export default Dashboard;