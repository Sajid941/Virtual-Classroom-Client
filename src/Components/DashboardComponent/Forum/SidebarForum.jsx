import React from "react";
import { FaPlusSquare } from "react-icons/fa";

// JSON structure for categories
const categories = [
  { id: 1, name: "All discussion", slug: "all" },
  { id: 2, name: "Programming", slug: "slug" },
  { id: 3, name: "Design", slug: "slug" },
  { id: 4, name: "Business", slug: "slug" },
  { id: 5, name: "Web Development", slug: "slug" },
];

const SidebarForum = () => {
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
          {categories.map((category) => (
            <>
              <li key={category.slug} className="flex items-center gap-4 ">
                <div className="badge badge-accent"></div>
                <a
                  href={`discussion/${category?.slug}`}
                  className="block px-4 py-2 text-gray-600 font-bold text-[18px] hover:text-gray-700"
                >
                  {category.name}
                </a>
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarForum;
