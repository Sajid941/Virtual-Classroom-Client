import { GoDotFill } from "react-icons/go";
import { FaPlusSquare } from "react-icons/fa";
import DiscussionForm from "./DiscussionForm";
import PropTypes from 'prop-types'

const Sidebar = ({setDiscussionCategory}) => {
    const categories = [
        "All",
        "Mongoose",
        "React",
        "SEO",
        "Node.js",
        "API Development",
        "Frontend Development",
        "poetry",
        "test"
    ];

    const handleShowModal = () => {
        document.getElementById('my_modal_3').showModal()
    }
const handleSelectCategory = (category) => {
    setDiscussionCategory(category)
}
    return (
        <div>
            <DiscussionForm />
            <div className="drawer lg:drawer-open fixed">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                        Open drawer
                    </label>
                </div>

                <div className="drawer-side z-20">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu bg-base-200 lg:bg-white lg:rounded-xl lg:border-2  text-[#4b5563] min-h-full p-4 " >

                        <div className="wrap">
                            <button
                                className="btn bg-transparent border rounded-lg text-xl w-full justify-start shadow-gray-600 gap-5"
                                onClick={handleShowModal}
                            >
                                <FaPlusSquare className="text-gray-600" />
                                <span className="text-gray-600 text-lg">Post a discussion</span>
                            </button>
                        </div>

                        <ul className="mt-5">
                            {categories.map((category, index) => (
                                <li onClick={() => handleSelectCategory(category)} key={index} className=" hover:text-black text-xl font-semibold">
                                    <span className="flex gap-4"><GoDotFill size={30} color="#00d7c0" /> {category}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
Sidebar.propTypes ={
    setDiscussionCategory: PropTypes.func.isRequired
}