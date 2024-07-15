import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";

const DashCommentContainer = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/comment/get-comments?userId=${
          currentUser._id
        }&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setComments(data.comments);
        if (data.comments.length < 10) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (commentIdToDelete) => {
    if (!confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/comment/delete-comment/${commentIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
      }

      console.log(comments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMore = async () => {
    const startIndex = comments.length;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/comment/get-comments?userId=${
          currentUser._id
        }&limit=10&startIndex=${startIndex}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);

        if (data.comments.length < 10) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-8 pt-4 pb-16">
      <Helmet>
        <title>Dashboard | Comments</title>
        <link
          rel="canonical"
          href="https://insightloop.com/dashboard?tab=comments"
        />
      </Helmet>
      <div className="relative overflow-x-auto sm:rounded-lg">
        {currentUser.isAdmin && comments.length > 0 ? (
          <>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Comment Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Post Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Number of Like
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Number of Dislike
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Content
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{comment._id}</td>
                    <td className="px-6 py-4">{comment.postId}</td>
                    <td className="px-6 py-4">{comment.numberOfLikes}</td>
                    <td className="px-6 py-4">{comment.numberOfDislikes}</td>
                    <td className="px-6 py-4">{comment.content}</td>
                    <td className=" items-center px-6 py-4">
                      <button
                        onClick={() => handleDeletePost(comment._id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full flex justify-center">
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className=" text-blue-500 w-[150px] h-[50px] text-center hover:text-blue-700 font-bold py-2 px-4 rounded-lg"
                >
                  Show More
                </button>
              )}
            </div>
          </>
        ) : (
          <h1 className="text-5xl font-bold text-center my-6">No Post Found</h1>
        )}
      </div>
    </div>
  );
};

export default DashCommentContainer;
