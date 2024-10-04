import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";

const DashPostContainer = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL +
          "/api/post/get-post?userId=" +
          currentUser._id +
          "&limit=" +
          10
      );

      const data = await response.json();

      if (response.ok) {
        setPosts(data.posts);
        if (data.posts.length > 9) {
          setShowMore(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (postIdToDelete) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const res = await fetch(
        import.meta.env.VITE_API_BASE_URL +
          "/api/post/delete-post/" +
          postIdToDelete,
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
        setPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;

    const API_URL =
      import.meta.env.VITE_API_BASE_URL +
      "/api/post/get-post?userId=" +
      currentUser._id +
      "&startIndex=" +
      startIndex;

    try {
      const res = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);

        if (data.posts.length <= 0) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 pt-4 pb-16">
      <Helmet>
        <link
          rel="canonical"
          href="https://insightloop.com/dashboard?tab=posts"
        />
        <title>Dashboard | Posts</title>
      </Helmet>
      <div className="relative overflow-x-auto sm:rounded-lg">
        {currentUser.isAdmin && posts.length > 0 ? (
          <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Post Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Post Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Post Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{post._id}</td>
                    <td className="px-6 py-4">
                      <img
                        src={post.image}
                        alt=""
                        className="h-12 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/post/${post.slug}`}
                        className="hover:underline"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{post.category}</td>
                    <td className=" items-center px-6 py-4">
                      <Link
                        to={`/update-post/${post._id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeletePost(post._id)}
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

export default DashPostContainer;
