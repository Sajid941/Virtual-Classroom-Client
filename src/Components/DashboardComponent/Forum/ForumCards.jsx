import PropTypes from "prop-types";
import { FaEye } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import { Link } from "react-router-dom";

const ForumCards = ({ discussion }) => {
  return (
    <div>
      <Link
        to={`/forum/discussion/${discussion.slug}`}
        className="flex items-start shadow-md mb-4 p-4 rounded-lg shadow-gray-400 transition-all  border hover:shadow-gray-500 hover:-translate-y-1 relative"
      >
        <div className="basis-1/6">
          <img
            src={discussion.author.profilePic}
            alt={discussion.author.name}
            className="w-20 h-20 rounded-full mr-2"
          />
        </div>
        <div className="basis-4/6">
          <div className="wrap">
            <h2 className="text-xl text-secondary font-bold">
              {discussion.title}
            </h2>
            <div className="time italic">
              <span className="text-sm text-gray-500">
                {new Date(discussion.createdAt).toLocaleDateString()}
              </span>
              <span className="text-sm text-gray-500 ml-4">
                {new Date(discussion.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-gray-700 mt-4">
              {discussion.content.slice(0, 150)}...
            </p>
          </div>
        </div>
        <div className="wrap">
          <span className="absolute bg-secondary text-white badge rounded-none top-0 right-0">
            {discussion.category}
          </span>
          <div className="flex absolute gap-4 items-center bottom-2 right-2">
            <span className=" flex items-center  rounded-none ">
              <MdComment /> ({discussion?.replies.length})
            </span>
            <span className=" flex items-center  rounded-none ">
              <FaEye /> {discussion?.views}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

ForumCards.propTypes = {
  discussion: PropTypes.object,
};
export default ForumCards;
