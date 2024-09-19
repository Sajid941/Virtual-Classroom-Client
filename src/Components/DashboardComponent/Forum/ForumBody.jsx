import React, { useEffect, useState } from "react";
import SidebarForum from "./SidebarForum";
import ForumCards from "./ForumCards";

const ForumBody = () => {
  const [discussions, setDiscussions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    fetch("discussion.json")
      .then((response) => response.json())
      .then((data) => {
        setDiscussions(data);

        const uniqueCategories = [
          "All",
          ...new Set(data.map((discussion) => discussion.category)),
        ];
        setCategories(uniqueCategories);
        setFilteredDiscussions(data);
      })
      .catch((error) => console.error("Error fetching discussions:", error));
  }, []);

  useEffect(() => {
    let updatedDiscussions = discussions;

    if (searchTerm) {
      updatedDiscussions = updatedDiscussions.filter((discussion) =>
        discussion.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    updatedDiscussions = updatedDiscussions.sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOption === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortOption === "ascending") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "descending") {
        return b.title.localeCompare(a.title);
      } else {
        return 0;
      }
    });

    setFilteredDiscussions(updatedDiscussions);
  }, [searchTerm, sortOption, discussions]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleMarkAllRead = () => {
    console.log("Mark all discussions as read");
    // Implement the logic for marking all as read
  };

  return (
    <div className="px-4">
      <div className="flex flex-col-reverse lg:flex-row gap-4 mt-12">
        {/* Main content */}
        <div className="basis-full lg:basis-3/4 min-h-screen bg-white border rounded-lg shadow-xl p-4">
          <div className="mb-6">
            <form className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-4 w-full">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="border p-2 rounded-lg w-full lg:w-32 basis-1/6 shadow-md text-gray-500 font-bold"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border h-12 text-center p-2 rounded-lg w-full lg:w-1/3 basis-4/6 shadow-md"
              />
              <div className="basis-1/6 ">
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-colors"
                >
                  Mark Read
                </button>
              </div>
            </form>
          </div>

          {filteredDiscussions.map((discussion) => (
            <ForumCards
              key={discussion?.discussionId}
              discussion={discussion}
            />
          ))}
        </div>

        {/* Sidebar */}
        <div className="basis-full lg:basis-1/4 lg:min-h-screen bg-white rounded-lg border p-4">
          <SidebarForum
            categories={categories}
            setFilteredDiscussions={setFilteredDiscussions}
            discussions={discussions}
          />
        </div>
      </div>
    </div>
  );
};

export default ForumBody;
