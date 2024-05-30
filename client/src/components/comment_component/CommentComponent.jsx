import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CommentCard from "../cards/CommentCard";

const CommentComponent = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState(""); // Add a separate state for the comment input
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (comment.length > 200) {
      return setError("Comment must be less than 200 characters");
    }

    if (!currentUser || !currentUser._id) {
      return setError("User not authenticated or missing user ID");
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/comment/create-comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
          body: JSON.stringify({
            postId: postId,
            userId: currentUser._id,
            content: comment,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      } else {
        fetchComments(); // Add the new comment to the comments state
        setComment(""); // Clear the comment input
        setError(null); // Clear any previous error
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/comment/like-comment/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
      } else {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/comment/dislike-comment/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
      } else {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  dislikes: data.dislikes,
                  numberOfDislikes: data.dislikes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/comment/get-comments/${postId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      } else {
        const validComments = data.filter(
          (comment) => comment && comment._id && comment.content
        );
        setComments(validComments);
        setComment("");
        setError(null);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-[55%] m-auto">
      {currentUser ? (
        <>
          <div className="flex items-center my-6">
            <div className="mr-4">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={currentUser.pictureProfile}
                alt=""
              />
            </div>
            <p className="text-sm font-medium">
              signed in as{" "}
              <span className="text-blue-500">{currentUser.email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmitComment}>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <textarea
                  id="comment"
                  onChange={(e) => setComment(e.target.value)} // Bind the value to the comment state
                  value={comment}
                  rows="4"
                  className="outline-none w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <p className="text-sm text-gray-500">
                  no more than 200 characters
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  Post comment
                </button>
              </div>
            </div>
          </form>
          <p className="my-4 text-xl font-medium">
            Comments:{" "}
            <span className="px-4 py-1 border">{comments.length}</span>
          </p>
          <div></div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="comments-container">
            {comments.length === 0 ? (
              <>
                <h1 className="text-lg ml-4">No comments yet</h1>
              </>
            ) : (
              <>
                {comments.map((comment) => (
                  <CommentCard
                    key={comment._id}
                    comment={comment}
                    onLike={handleLike}
                    onDislike={handleDislike}
                  />
                ))}
              </>
            )}
          </div>
        </>
      ) : (
        <div className="my-8">
          <p className="text-xl font-medium">
            Please{" "}
            <Link to="/sign-up" className="text-blue-500">
              sign in
            </Link>{" "}
            to write or see comment
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentComponent;
