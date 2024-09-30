import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form"; // Import useForm
import useRole from './../../CustomHooks/useRole';
import useUser from "../../CustomHooks/useUser";
import { useEffect } from "react";

const DetailedDiscussion = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { role } = useRole(); // Get the user's role
  const { userdb } = useUser();

  const {
    data: discussion,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["discussion", slug],
    queryFn: async () => {
      const res = await axiosPublic(`/discussions/slug/${slug}`);
      return res.data;
    },
    enabled: !!slug,
    keepPreviousData: true,
  });

  const { register, handleSubmit, reset } = useForm(); // Use useForm hook

  const handleGoBack = () => {
    navigate(-1);
  };
  
   // Function to increment view count
   // eslint-disable-next-line react-hooks/exhaustive-deps
   const incrementViewCount = async () => {
    if (discussion) {
      try {
        await axiosPublic.patch(`/discussions/${discussion._id}/incrementViews`);
      } catch (error) {
        console.error("Error incrementing view count:", error);
      }
    }
  };

  useEffect(() => {
    incrementViewCount();
  }, [incrementViewCount, slug]);


  const handleReplySubmit = async (data) => {
    // data will contain the registered fields
    if (!data.replyMessage.trim()) return;

    try {
      const newReply = {
        replyId: discussion.replies.length + 1, // Increment the reply ID
        content: data.replyMessage,
        author: userdb?.name, // Replace with the actual teacher's name
        profileImage: userdb?.profileImage,
        email: userdb?.email,
        createdAt: new Date().toISOString(), // Set the current time
      };

      const res = await axiosPublic.patch(`discussions/${discussion.discussionId}`, newReply);
      // Update local state directly or use a state update if needed
      if (res.status === 200) {
        refetch()
      }
      reset(); // Reset the form after submission
    } catch (error) {
      console.error("Error adding reply:", error);
    }
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
        <span className="">Error loading discussions</span>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>{discussion?.title} | Discussion</title>
      </Helmet>
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
                  src={discussion.author?.profilePic}
                  alt={discussion.author?.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h1 className="text-2xl font-bold">{discussion.title}</h1>
                  <p className="text-gray-600 text-sm">
                    by {discussion.author?.name}
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

              {/* Reply Form */}
              {role === "teacher" && (
                <form onSubmit={handleSubmit(handleReplySubmit)} className="mt-6">
                  <textarea
                    {...register("replyMessage")} // Register the textarea
                    className="w-full border rounded-lg p-2"
                    rows="3"
                    placeholder="Add your reply here..."
                  />
                  <button
                    type="submit"
                    className="mt-2 text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
                  >
                    Submit Reply
                  </button>
                </form>
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
