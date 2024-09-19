import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ForumCards = ({ discussion }) => {
  return (
    <div>
      {/* <li key={discussion.discussionId} className="mb-6">
        <h2 className="text-xl font-bold">{discussion.title}</h2>
        <p className="text-gray-700">{discussion.content}</p>
        <div className="flex items-center mt-2">
          <img
            src={discussion.author.profilePic}
            alt={discussion.author.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm text-gray-600">
            {discussion.author.name}
          </span>
          <span className="text-sm text-gray-500 ml-4">
            {new Date(discussion.createdAt).toLocaleDateString()}
          </span>
          <span className="text-sm text-gray-500 ml-4">
            Views: {discussion.views}
          </span>
        </div>
        <div className="mt-3">
          <h3 className="font-semibold">Replies:</h3>
          {discussion.replies.length > 0 ? (
            <ul className="mt-2">
              {discussion.replies.map((reply) => (
                <li key={reply.replyId} className="mb-2">
                  <p>{reply.content}</p>
                  <span className="text-sm text-gray-600">
                    - {reply.author},{" "}
                    {new Date(reply.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No replies yet.</p>
          )}
        </div>
      </li> */}
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
          <span className="absolute bg-secondary text-white badge rounded-none top-0 right-0">{discussion.category}</span>
        </div>
      </Link>
    </div>
  );
};

ForumCards.propTypes = {
  discussion: PropTypes.object,
};
export default ForumCards;
