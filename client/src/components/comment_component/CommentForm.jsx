import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CommentForm = ({ onFetchComment, postId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comment, setComment] = useState(""); // Add a separate state for the comment input

  const [error, setError] = useState(null);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!comment) {
      return setError("Comment cannot be empty");
    }

    if (comment.length > 200) {
      return setError("Comment must be less than 200 characters");
    }

    if (!currentUser || !currentUser._id) {
      return setError("User not authenticated or missing user ID");
    }

    setError(null);

    try {
      // Send a POST request to the API to create a new comment
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
        onFetchComment();
        setComment(""); // Clear the comment input
      }
    } catch (error) {
      console.error(error);
      setError("Failed to create comment");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitComment} className=" m-auto my-4">
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <textarea
              id="comment"
              onChange={(e) => setComment(e.target.value)} // Bind the value to the comment state
              value={comment}
              rows="4"
              className="outline-none w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <p className="text-sm text-gray-500">no more than 200 characters</p>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>
          </div>
        </div>
      </form>
      {error && (
        <div className="flex items-center justify-center m-auto bg-red-300 py-4 my-4 rounded-xl w-[50%]">
          <p className="text-red-500 ">{error}</p>
        </div>
      )}
    </>
  );
};

export default CommentForm;
