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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const axiosPublic = useAxiosPublic();

  const {
    data: discussions = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["discussions"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/discussions`);
      return res.data;
    },
    keepPreviousData: true,
    enabled: true,
  });

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

    // Apply search filtering with null/undefined check for title
    const filtered = sortedDiscussions.filter((discussion) =>
      (discussion.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setFilteredDiscussions(filtered);
  }, [discussions, sortOption, searchTerm]);

  // Update categories
  useEffect(() => {
    const uniqueCategories = new Set(
      discussions.map((discussion) => discussion.category)
    );
    setCategories([...uniqueCategories]);
  }, [discussions]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDiscussions = filteredDiscussions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredDiscussions.length / itemsPerPage);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleMarkAllRead = () => {
    console.log("Mark all discussions as read");
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

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
        <span>Error loading discussions</span>
      </div>
    );
  }

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
              <div className="basis-1/6">
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

          {/* Display the current discussions */}
          {currentDiscussions.map((discussion) => (
            <ForumCards key={discussion.discussionId} discussion={discussion} />
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              disabled={currentPage === 1}
              onClick={goToPreviousPage}
              className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => goToPage(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={goToNextPage}
              className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="basis-full lg:basis-1/4 lg:min-h-screen bg-white rounded-lg border p-4">
          <SidebarForum
            categories={categories}
            setFilteredDiscussions={setFilteredDiscussions}
            discussions={discussions}
            setCategories={setCategories}
            refetch={refetch}
          />
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default ForumBody;
