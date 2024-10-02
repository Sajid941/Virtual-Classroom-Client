import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { FaEye } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import Loading from '../Loading';

const ForumCards = ({ discussionCategory }) => {
  const axiosPublic = useAxiosPublic()


  const { data: discussions, isPending } = useQuery({
    queryKey: ["discussions", discussionCategory],
    queryFn: async () => {
      const res = await axiosPublic(`/discussions?category=${discussionCategory}`)
      return res.data
    },
    enabled: !!discussionCategory
  })

  if (isPending) {
    return <Loading />
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 z-50 mb-5">
        {/* Dropdown */}
        <div>
          <select className="select select-warning w-full">
            <option disabled selected>Newest</option>
            <option>Cheese</option>
            <option>Veggie</option>
            <option>Pepperoni</option>
            <option>Margherita</option>
            <option>Hawaiian</option>
          </select>
        </div>

        {/* Search Input */}
        <form className="w-full md:col-span-2">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
          </label>
        </form>

        {/* Button */}
        <div className="">
          <button className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Mark Read
          </button>
        </div>
      </div>
      <div>
        {
          discussions?.map(discussion => (
            <Link
              key={discussion._id}
              to={`/forum/discussion/${discussion?.slug}`}
              className="flex items-start shadow-md mb-4 p-4 rounded-lg shadow-gray-400 transition-all border hover:shadow-gray-500 hover:-translate-y-1 w-full relative"
            >
              <div className="basis-1/6">
                <img
                  src={discussion?.author?.profilePic ? discussion.author.profilePic : "https://i.postimg.cc/Wb62RdHN/user.png"}
                  alt={discussion?.author?.name || "Unknown Author"} // Use a fallback name
                  className="w-20 h-20 rounded-full mr-2"
                />
              </div>
              <div className="basis-4/6">
                <div className="wrap">
                  <h2 className="text-xl text-secondary font-bold">
                    {discussion?.title || "No Title"}
                  </h2>
                  <div className="time italic">
                    <span className="text-sm text-gray-500">
                      {discussion?.createdAt
                        ? new Date(discussion.createdAt).toLocaleDateString()
                        : "Unknown Date"}
                    </span>
                    <span className="text-sm text-gray-500 ml-4">
                      {discussion?.createdAt
                        ? new Date(discussion.createdAt).toLocaleTimeString()
                        : ""}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-4">
                    {discussion?.content?.slice(0, 150) || "No Content"}...
                  </p>
                </div>
              </div>
              <div className="wrap">
                <span className="absolute bg-secondary rounded-tr-md text-white badge rounded-none top-0 right-0">
                  {discussion?.category || "Uncategorized"}
                </span>
                <div className="flex absolute gap-4 items-center bottom-2 right-2">
                  <span className="flex items-center rounded-none">
                    <MdComment /> ({discussion?.replies?.length || 0})
                  </span>
                  <span className="flex items-center rounded-none">
                    <FaEye /> {discussion?.views || 0}
                  </span>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
};

ForumCards.propTypes = {
  discussionCategory: PropTypes.string
};

export default ForumCards;
