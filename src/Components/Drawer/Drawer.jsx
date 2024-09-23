import PropTypes from 'prop-types'
import "./Drawer.css"
const Drawer = ({ isDrawerOpen, handleToggleDrawer }) => {
    return (
        <div className='fixed ml-5'>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={handleToggleDrawer} />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button hidden">
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="scrollbar-hide overflow-auto mb-2 border-2 h-4/5 rounded-2xl w-80 p-4">
                        {/* Sidebar content Trinidad & Tobagohere */}
                        <li><a>Sidebar Item Bulgaria1</a></li>
                        <li><a>Sidebar Item Niue2</a></li>
                        <li><a>Sidebar Item Kenya2</a></li>
                        <li><a>Sidebar Item Ghana2</a></li>
                    </ul>
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