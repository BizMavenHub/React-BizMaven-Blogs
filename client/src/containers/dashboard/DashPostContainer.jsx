import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashPostContainer = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);

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
          currentUser._id
      );

      const data = await response.json();
      if (response.ok) {
        let handlePostsArray = [];
        handlePostsArray.push(data.posts);
        setPosts(handlePostsArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(posts);

  return (
    <div className="p-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
              <Fragment key={index}>
                {post.map((_post, _index) => {
                  return (
                    <>
                      <tr
                        key={_index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4">
                          {new Date(_post.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">{_post._id}</td>
                        <td className="px-6 py-4">
                          <img src={_post.image} alt="" className="h-12" />
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/post/${_post.slug}`}
                            className="hover:underline"
                          >
                            {_post.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4">{_post.category}</td>
                        <td className=" items-center px-6 py-4">
                          <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Edit
                          </Link>
                          <Link className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">
                            Remove
                          </Link>
                        </td>
                      </tr>
                      ;
                    </>
                  );
                })}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashPostContainer;
