import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { FaEye } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import Loading from '../Loading';

const ForumCards = () => {
  const axiosPublic = useAxiosPublic()

  const { data: discussions, isPending } = useQuery({
    queryKey: ["discussions"],
    queryFn: async () => {
      const res = await axiosPublic("/discussions")
      return res.data
    }
  })

  if (isPending) {
    return <Loading />
  }

  return (
    <div>
      {
        discussions.map(discussion => (
          <Link
          key={discussion._id}
            to={`/forum/discussion/${discussion?.slug}`}
            className="flex items-start shadow-md mb-4 p-4 rounded-lg shadow-gray-400 transition-all border hover:shadow-gray-500 hover:-translate-y-1 w-full relative"
          >
            <div className="basis-1/6">
              <img
                src={discussion?.author?.profilePic? discussion.author.profilePic : "https://i.postimg.cc/Wb62RdHN/user.png"} 
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
  );
};

ForumCards.propTypes = {
  discussion: PropTypes.object,
};

export default ForumCards;
