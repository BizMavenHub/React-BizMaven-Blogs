import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CommentCard from "../cards/CommentCard";
import CommentForm from "../comment_component/CommentForm";

const CommentComponent = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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

          <p className="my-4 text-xl font-medium">
            Comments:{" "}
            <span className="px-4 py-1 border">{comments.length}</span>
          </p>

          <CommentForm postId={postId} onFetchComment={fetchComments} />

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
