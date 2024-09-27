import { useState, useEffect } from "react";
import { FaPlusSquare } from "react-icons/fa";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const SidebarForum = ({ categories, setFilteredDiscussions, discussions, setCategories }) => {

  const [showForm, setShowForm] = useState(false); 
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false); 
  const [slug, setSlug] = useState(""); 
  const { register, handleSubmit, reset, watch } = useForm(); 

  const titleWatch = watch("title"); 

  
  useEffect(() => {
    if (titleWatch) {
      setSlug(titleWatch.toLowerCase().replace(/\s+/g, "-"));
    }
  }, [titleWatch]);

  const handleCategoryClick = (categoryName) => {
    if (categoryName === "All") {
      setFilteredDiscussions(discussions); 
    } else {
      const filtered = discussions.filter(
        (discussion) => discussion.category === categoryName
      );
      setFilteredDiscussions(filtered);
    }
  };

  //Submit Forum
  const onSubmit = (data) => {
    const selectedCategory = isAddingNewCategory
      ? data.newCategory
      : data.category; 

    
    if (isAddingNewCategory && !categories.includes(data.newCategory)) {
      setCategories((prevCategories) => [...prevCategories, data.newCategory]);
    }

    const newDiscussion = {
      title: data.title,
      slug: slug, 
      content: data.content,
      category: selectedCategory,
      author: {
        name: data.authorName,
        profilePic: data.authorProfilePic,
      },
      createdAt: new Date().toISOString(), 
      views: 0, 
      replies: [], 
    };

    console.log(newDiscussion);

    
    reset();
    setIsAddingNewCategory(false); 
    setShowForm(false); 
  };

  return (
    <div className="">
      <div className="wrap">
        <button
          className="btn bg-transparent border rounded-lg text-xl w-full justify-start shadow-gray-600 gap-5"
          onClick={() => setShowForm(true)} 
        >
          <FaPlusSquare className="text-gray-600" />
          <span className="text-gray-600 text-lg">Post a discussion</span>
        </button>
      </div>

      {/* DaisyUI Modal */}
      {showForm && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Post a Discussion</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Discussion Title
                </label>
                <input
                  {...register("title", { required: "This filed Required" })}
                  className="input input-bordered w-full"
                  placeholder="Enter the title of your discussion"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Category
                </label>
                <select
                  {...register("category", {required: "This filed Required"})}
                  className="select select-bordered w-full"
                  onChange={(e) =>
                    setIsAddingNewCategory(e.target.value === "newCategory")
                  }
                  disabled={isAddingNewCategory} 
                >
                  <option value="">Select a category</option>
                  {categories?.slice(1).map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value="newCategory">Add New Category</option>
                </select>

                {/* Conditionally render input for new category */}
                {isAddingNewCategory && (
                  <div className="mt-2">
                    <label className="block text-gray-700 font-bold mb-2">
                      New Category Name
                    </label>
                    <input
                      {...register("newCategory", { required: "This filed Required" })}
                      className="input input-bordered w-full"
                      placeholder="Enter new category name"
                    />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Content
                </label>
                <textarea
                  {...register("content", { required: "This filed Required" })}
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter the content of your discussion"
                ></textarea>
              </div>

              <div className="modal-action">
                <div>
                  <button type="submit" className="btn w-full bg-[#ffc107] hover:bg-[#ffdf1b]">
                    Submit
                  </button>
                </div>
                <div >
                  <button
                    type="button"
                    className="btn w-full bg-[#004085] hover:bg-[#0053b3] text-white"
                    onClick={() => setShowForm(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="categories-section mt-10">
        <ul className="list-none">
          {categories?.map((category, index) => (
            <li
              key={index}
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="badge badge-accent"></div>
              <div className="block px-4 py-2 text-gray-600 font-bold text-[18px] hover:text-gray-700">
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
  setCategories: PropTypes.func, 
};


export default SidebarForum;
