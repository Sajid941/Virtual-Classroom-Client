import PropTypes from 'prop-types'
import "./Drawer.css"
import { SiGoogleclassroom } from "react-icons/si";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdAssignmentAdd } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { GrDocumentPerformance } from "react-icons/gr";
import { MdAddToPhotos } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';

const Drawer = ({ isDrawerOpen, handleToggleDrawer }) => {

    const user = "student"

    return (
        <div className='fixed ml-5 z-20'>
            <div className="drawer md:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={handleToggleDrawer} />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button hidden">
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side shadow-md">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="scrollbar-hide bg-white overflow-auto mb-2 md:border-2  h-screen md:h-4/5 md:rounded-2xl w-64 space-y-5 pt-12 md:pt-5">
                        {/* Sidebar content Trinidad & Tobagohere */}
                        <ul className='space-y-5 p-5 pl-8'>
                            <li>
                                <NavLink to="/dashboard" className="dashboard-link">
                                    <IoHomeOutline size={25} />
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/assignments" className="dashboard-link">
                                    <MdAssignmentAdd size={25} />
                                    Assignments
                                </NavLink>
                            </li>
                            {
                                user === "teacher" &&
                                <>
                                    <li>
                                        <NavLink to="/myClasses" className="dashboard-link">
                                            <SiGoogleclassroom size={25} />
                                            My Classes
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/schedules" className="dashboard-link">
                                            <AiOutlineSchedule size={25} />
                                            Schedules
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="createClass" className="dashboard-link">
                                            <IoCreateOutline size={25} />
                                            Create A Class
                                        </NavLink>
                                    </li>
                                </>
                            }
                            {
                                user === "student" &&
                                <>
                                    <li>
                                        <NavLink to="/myClasses" className="dashboard-link">
                                            <SiGoogleclassroom size={25} />
                                            Classes
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/performance" className="dashboard-link">
                                            <GrDocumentPerformance size={25} />
                                            Performance
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="joinClass" className="dashboard-link">
                                            <MdAddToPhotos size={25} />
                                            Join A Class
                                        </NavLink>
                                    </li>
                                </>
                            }
                        </ul>
                        <div className="bg-[#004085] lg:hidden text-white w-full  p-5">
                            <DashboardSidebar />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Drawer;

Drawer.propTypes = {
    isDrawerOpen: PropTypes.bool,
    handleToggleDrawer: PropTypes.bool
}