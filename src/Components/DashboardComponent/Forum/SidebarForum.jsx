import React from "react";
import { FaPlusSquare } from "react-icons/fa";
import PropTypes from "prop-types";

const SidebarForum = ({ categories, setFilteredDiscussions, discussions }) => {
  const handleCategoryClick = (categoryName) => {
    if (categoryName === "All") {
      setFilteredDiscussions(discussions); // Show all discussions if "All" is selected
    } else {
      const filtered = discussions.filter(
        (discussion) => discussion.category === categoryName
      );
      setFilteredDiscussions(filtered);
    }
  };

  return (
    <div className="">
      <div className="wrap">
        <button className="btn bg-transparent border rounded-lg text-xl w-full justify-start shadow-gray-600 gap-5">
          <FaPlusSquare className="text-gray-600" />
          <span className="text-gray-600 text-lg">Post a discussion</span>
        </button>
      </div>

      <div className="categories-section mt-10">
        <ul className="list-none">
          {categories?.map((category, index) => (
            <li
              key={index}
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="badge badge-accent"></div>
              <div
                className="block px-4 py-2 text-gray-600 font-bold text-[18px] hover:text-gray-700"
              >
                {category}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

SidebarForum.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilteredDiscussions: PropTypes.func.isRequired,
  discussions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired, 
    })
  ).isRequired,
};

export default SidebarForum;
