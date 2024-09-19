import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailedDiscussion = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [discussion, setDiscussion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        setLoading(true);
        const response = await fetch("/discussion.json");
        if (!response.ok) {
          throw new Error("Failed to fetch discussions");
        }
        const data = await response.json();
        const foundDiscussion = data.find(
          (discussion) => discussion.slug === slug
        );

        if (foundDiscussion) {
          setDiscussion(foundDiscussion);
        } else {
          setError("Discussion not found");
        }
      } catch (err) {
        setError("Error fetching discussion");
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussion();
  }, [slug]);

  const handleGoBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="wrapper">
      <div className="discussionWrap pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl border mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
          <button
            onClick={handleGoBack}
            className="mb-4 text-blue-500 hover:underline"
          >
            ← Go Back
          </button>
          {discussion ? (
            <div>
              <div className="flex items-center mb-4">
                <img
                  src={discussion.author.profilePic}
                  alt={discussion.author.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h1 className="text-2xl font-bold">{discussion.title}</h1>
                  <p className="text-gray-600 text-sm">
                    by {discussion.author.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {new Date(discussion.createdAt).toLocaleDateString()} |
                    Views: {discussion.views}
                  </p>
                </div>
              </div>

              <div className="my-6">
                <p className="text-gray-800">{discussion.content}</p>
              </div>

              <hr className="my-6" />

              <h3 className="text-lg font-semibold mb-4">Replies:</h3>

              {discussion.replies && discussion.replies.length > 0 ? (
                <ul>
                  {discussion.replies.map((reply) => (
                    <li
                      key={reply.replyId}
                      className="mb-6 bg-gray-100 p-4 rounded-lg transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                    >
                      <p className="text-gray-700">{reply.content}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-600">
                        <span className="mr-2">- {reply.author}</span>
                        <span>
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No replies yet.</p>
              )}
            </div>
          ) : (
            <p>No discussion found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedDiscussion;
