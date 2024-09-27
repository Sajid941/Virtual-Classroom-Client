import React, { useEffect, useState } from "react";
import SidebarForum from "./SidebarForum";
import ForumCards from "./ForumCards";
import { ScrollRestoration } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";

const ForumBody = () => {
  const [categories, setCategories] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const axiosPublic = useAxiosPublic();

  const {
    data: discussions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["discussions"], // Ensure a unique key
    queryFn: async () => {
      const res = await axiosPublic.get(`/discussions`);
      return res.data;
    },
    keepPreviousData: true,
    enabled: true, // Set enabled to true for the query to run
  });

  // Sort and filter discussions based on selected options
  // Sort and filter discussions based on selected options
  useEffect(() => {
    const sortedDiscussions = [...discussions];

    // Sort based on the selected sort option
    switch (sortOption) {
      case "newest":
        sortedDiscussions.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "oldest":
        sortedDiscussions.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "ascending":
        sortedDiscussions.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "descending":
        sortedDiscussions.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    // Apply search filtering
    const filtered = sortedDiscussions.filter((discussion) =>
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredDiscussions(filtered);
  }, [discussions, sortOption, searchTerm]); // Ensure to include the proper dependencies

  useEffect(() => {
    const uniqueCategories = new Set(
      discussions.map((discussion) => discussion.category)
    );
    setCategories([...uniqueCategories]);
  }, [discussions]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="">Error loading discussions</span>
      </div>
    );
  }

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
              key={discussion.discussionId} // Use discussionId instead of _id
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
            setCategories={setCategories}
          />
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default ForumBody;
